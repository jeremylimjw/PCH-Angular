import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MessageService, TypeEnum } from '../services/message.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {appointment: any},
    private messageService: MessageService,
    private apiService: ApiService) { }

  getBasicRate() {
    return this.data.appointment.total_price - this.data.appointment.prescriptions.reduce((a: any,b: any) => a + (b.medication.price_per_quantity * b.quantity), 0);
  }

  cancelAppointment() {
    this.apiService.cancelAppointment(this.data.appointment.id).subscribe(res => {
      this.messageService.addTemporaryMessage(TypeEnum.Success, "Appointment has been cancelled.", "ID " + res);
      this.dialogRef.close();
    });
  }
}
