import { DatePipe } from "@angular/common";

export class MedicalRecord {

id: number | undefined;
name: string | undefined;
nric: string | undefined;
address: string | undefined;
dob: any;
contact_number: string | undefined;
blood_type:  string | undefined;
drug_allergys: string[] | undefined;
family_historys: string[] | undefined;
past_medical_historys: string[] | undefined;
vaccinations: string[] | undefined;
appointments: any[] | undefined;



constructor(id?: number,name?: string,nric?: string,address?: string ,
            dob?: Date,contact_number?: string,blood_type?:  string,
            drug_allergys?: string[],family_historys?: string[], 
            past_medical_historys?: string[],vaccinations?: string[],appointments?: any[] )
    {
        this.id=id;
        this.name=name;
        this.nric=nric;
        this.address=address;
        this.dob=dob;
        this.contact_number=contact_number;
        this.blood_type=blood_type;
        this.drug_allergys=drug_allergys;
        this.family_historys=family_historys;
        this.past_medical_historys=past_medical_historys;
        this.vaccinations=vaccinations;
        this.appointments = appointments;
    }


}
