import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MessageService, TypeEnum } from '../services/message.service';

const TIME_ARRAY = [
  { hour: 8, min: 0, text: "8:00 AM" }, { hour: 10, min: 0, text: "10:00 AM" },  { hour: 14, min: 0, text: "2:00 PM" }, { hour: 16, min: 0, text: "4:00 PM" }, 
  { hour: 8, min: 15, text: "8:15 AM" }, { hour: 10, min: 15, text: "10:15 AM" }, { hour: 14, min: 15, text: "2:15 PM" }, { hour: 16, min: 15, text: "4:15 PM" }, 
  { hour: 8, min: 30, text: "8:30 AM" }, { hour: 10, min: 30, text: "10:30 AM" }, { hour: 14, min: 30, text: "2:30 PM" }, { hour: 16, min: 30, text: "4:30 PM" }, 
  { hour: 8, min: 45, text: "8:45 AM" }, { hour: 10, min: 45, text: "10:45 AM" }, { hour: 14, min: 45, text: "2:45 PM" }, { hour: 16, min: 45, text: "4:45 PM" },
  { hour: 9, min: 0, text: "9:00 AM" }, { hour: 11, min: 0, text: "11:00 AM" },  { hour: 15, min: 0, text: "3:00 PM" }, { hour: 17, min: 0, text: "5:00 PM" }, 
  { hour: 9, min: 15, text: "9:15 AM" }, { hour: 11, min: 15, text: "11:15 AM" }, { hour: 15, min: 15, text: "3:15 PM" }, { hour: 17, min: 15, text: "5:15 PM" }, 
  { hour: 9, min: 30, text: "9:30 AM" }, { hour: 11, min: 30, text: "11:30 AM" }, { hour: 15, min: 30, text: "3:30 PM" }, { hour: 17, min: 30, text: "5:30 PM" }, 
  { hour: 9, min: 45, text: "9:45 AM" }, { hour: 11, min: 45, text: "11:45 AM" }, { hour: 15, min: 45, text: "3:45 PM" }, { hour: 17, min: 45, text: "5:45 PM" }
];

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  
  doctors: any[];
  appointments: any[];
  filteredAppointments1: any[];
  filteredAppointments2: any[];

  selectedDoctorControl: FormControl;
  selectedTypeControl: FormControl;
  selectedDateControl: FormControl;
  selectedTimeControl: FormControl;

  TIME_ARRAY = TIME_ARRAY;
  now = new Date();
  today = new Date();
  selectedMonth = new Date();
  calendarDates: Date[] = new Array();


  constructor(
    private apiService: ApiService, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router) {
    this.today.setHours(0,0,0,0); 
    this.doctors = [];
    this.appointments = [];
    this.filteredAppointments1 = [];
    this.filteredAppointments2 = [];
    this.selectedDoctorControl = new FormControl('any', Validators.required);
    this.selectedTypeControl = new FormControl('CONSULTATION', Validators.required);
    this.selectedDateControl = new FormControl('', Validators.required);
    this.selectedTimeControl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.apiService.getDoctors().subscribe(result => this.doctors = result);
    this.apiService.getAllAppointments().subscribe(result => {
      for (let appointment of result) appointment.date_time = new Date(appointment.date_time.replace('[UTC]',''))
      this.appointments = result;
      this.filteredAppointments1 = this.appointments;
    });
    
    this.selectedDoctorControl.valueChanges.subscribe(value => {
      if (value != 'any') {
        this.filteredAppointments1 = this.appointments.filter(x => x.employee.id == value.id);
      } else {
        this.filteredAppointments1 = this.appointments;
      }
    });

    this.selectedDateControl.valueChanges.subscribe(value => {
      if (value) {
        this.filteredAppointments2 = this.filteredAppointments1.filter(x => x.date_time.toDateString() == value.toDateString());
      }
    });
    
    this.populateCalendar();
  }

  // --- Part 2 of form ---
  populateCalendar(): void {
    this.calendarDates = new Array();
    var pointer = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), 1)
    var upper_bound_date = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0)

    if (pointer.getDay() > 0) pointer.setDate(pointer.getDate() - pointer.getDay())
    if (upper_bound_date.getDay() < 6) upper_bound_date.setDate(upper_bound_date.getDate() + (6 - upper_bound_date.getDay()))

    while (pointer <= upper_bound_date) {
      if (pointer.getDay() != 0 && pointer.getDay() != 6) {

        this.calendarDates.push(new Date(pointer))
      }
      pointer.setDate(pointer.getDate() + 1)
    }
  }

  decrementMonth(): void {
    this.selectedMonth = new Date(this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1));
    this.populateCalendar();
  }

  incrementMonth(): void {
    this.selectedMonth = new Date(this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1));
    this.populateCalendar();
  }

  selectDate(date: Date): void {
    this.selectedDateControl.setValue(date);
  }

  ifExceeds(date: Date): boolean {
    let count = 0;
    if(this.appointments && this.filteredAppointments1) {
      if (this.selectedDoctorControl.value == 'any') {
        for (let appointment of this.appointments) if(appointment.date_time.toDateString() == date.toDateString() && appointment.status != 'CANCELLED') count++;
        if (count >= (this.doctors.length * TIME_ARRAY.length)) return true;
      } else {
        for (let appointment of this.filteredAppointments1) if(appointment.date_time.toDateString() == date.toDateString() && appointment.status != 'CANCELLED') count++;
        if (count >= (TIME_ARRAY.length)) return true;
      }
    }

    return false;
  }
  // --- End of part 2 ---

  // --- Part 3 of form ---
  constructDate(hour: number, min: number) {
    if (this.selectedDateControl.value) {
      let date = new Date(this.selectedDateControl.value.getTime());
      date.setHours(hour, min);
      return date;
    }
    return null;
  }

  ifContains(time: any): boolean {
    if(this.appointments && this.selectedDateControl.value) {
      let thisDate = this.selectedDateControl.value.getTime() + time.hour*60*60*1000 + time.min*60*1000;
      if (this.selectedDoctorControl.value == 'any') {
        let count = 0;
        for (let appointment of this.filteredAppointments2) 
          if(appointment.date_time.getTime() == thisDate && appointment.status != 'CANCELLED') count++;
        if (count >= this.doctors.length) return true;
      } else {
        for (let appointment of this.filteredAppointments2) 
          if(appointment.date_time.getTime() == thisDate && appointment.status != 'CANCELLED') return true;
      }
    }
    return false;
  }

  submit(): void {
    let id: number;
    if (this.selectedDoctorControl.value != 'any') {
      id = this.selectedDoctorControl.value.id;
    } else {
      let appointmentsWithThatTime = this.appointments.filter(x => x.date_time.getTime() == this.selectedTimeControl.value.getTime());
      let trimmedDoctors = [...this.doctors];
      for (let a of appointmentsWithThatTime) {
        if (a.status != 'CANCELLED') trimmedDoctors = trimmedDoctors.filter(x => x.id != a.employee.id);
      }
      id =  trimmedDoctors[Math.trunc(Math.random() * trimmedDoctors.length)].id;
    }

    this.apiService.newAppointment(id, this.authService.getUser().medical_record.id, this.selectedTimeControl.value, this.selectedTypeControl.value).subscribe(result => {
      this.messageService.addTemporaryMessage(TypeEnum.Success, "New appointment has been created!", "Appointment ID with " + result + " has been created");
      this.router.navigate(['appointments']);
    });
  }
  // --- End of part 3 ---

}
