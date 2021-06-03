import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConnectionService } from './services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'covid-vaccine-availibilty';
  vaccineForm: FormGroup;
  vaccines;
  showVaccineDetails = true;
  constructor(
    private _connection: ConnectionService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ){

  }
  numbaer = 422101
  date;
  ngOnInit(){
    this.createVaccineForm();
    // this.getVaccineDetails(422101, '29-05-2021');
    // this._connection.getVaccineDetails(422101, '29-05-2021').subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // )

  }

  createVaccineForm(){
    this.vaccineForm = this.fb.group({
      pinCode: [''],
      date:['']
    })
  }

  getVaccineDetails(pinCode, dt){
    this._connection.getVaccineDetails(pinCode, dt).subscribe(
      res => {
        console.log(res.centers);
        this.vaccines = res.centers;
        this.showVaccineDetails = false;
      }, err => {
        console.log(err);
        this.showVaccineDetails = true;
      }
    )
  }



  onSubmit(){
    if(!this.vaccineForm.valid){
      return;
    }else {
      // console.log(this.vaccineForm.value);
      const pinCode = this.vaccineForm.controls.pinCode.value;
      debugger;
      const dt = this.vaccineForm.controls.date.value;
      const date = this.vaccineForm.controls.date.value;
      this.date = this.datePipe.transform(date, 'dd-MM-yyyy');
      console.log(this.date);
      this.getVaccineDetails(pinCode, this.date);

      this.showVaccineDetails = false;
    }
  }
}
