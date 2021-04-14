import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  accountForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
  });

  detailsForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    nric: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    dob: new FormControl('', Validators.required),
    contactNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    address: new FormControl(''),
    bloodType: new FormControl('')
  });
  
  allergys = new FormArray([new FormControl('')]);

  medicalHistorys = new FormArray([new FormControl('')]);
  familyHistorys = new FormArray([new FormControl('')]);
  vaccinations = new FormArray([new FormControl('')]);

  constructor(
    private apiService: ApiService, 
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private message: MessageService) { }

  ngOnInit(): void {
    this.accountForm.get("cPassword").valueChanges.subscribe(x => {
      if (x.length == 0 || x != this.accountForm.get("password").value) {
        this.accountForm.get("cPassword").setErrors({'incorrect': true});
      } else {
        this.accountForm.get("cPassword").setErrors(null);
      }
    });
  }

  onSubmit(): void {
    this.apiService.register({
      username: this.accountForm.value.username,
      password: this.accountForm.value.password,
      email: this.accountForm.value.email,
      medical_record: {
        name: this.detailsForm.value.name,
        nric: this.detailsForm.value.nric,
        address: this.detailsForm.value.address,
        dob: new Date(this.detailsForm.value.dob),
        contact_number: this.detailsForm.value.contactNumber,
        blood_type: this.detailsForm.value.bloodType,
        drug_allergys: this.allergys.value,
        family_historys: this.familyHistorys.value,
        past_medical_historys: this.medicalHistorys.value,
        vaccinations: this.vaccinations.value 
      }
    }).subscribe(res => {
      res['id'] = res.patientId;
      this.authService.setUser(res);
      this.router.navigate(['']);
    });
  }

  addAllergy() {
    this.allergys.push(new FormControl(''));
  }

  addMedicalHistory() {
    this.medicalHistorys.push(new FormControl(''));
  }

  addFamilyHistory() {
    this.familyHistorys.push(new FormControl(''));
  }

  addVaccination() {
    this.vaccinations.push(new FormControl(''));
  }

}
