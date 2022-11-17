import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HttpCommonService } from 'src/app/services/http-common.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent implements OnInit {
  addStaffForm: any = {
    company: {
      name: String,
      user_type: String,
    },
  };
  alert: string = 'This field empty';
  staff: any;

  constructor(
    private dialogRef: MatDialogRef<AddStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private http: HttpCommonService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addStaffForm = new FormGroup<any>({
      // _id: this.addStaffForm[this.addStaffForm.length -1]._id,
      email: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      civility: new FormControl('', [Validators.required]),
      company: new FormGroup({
        name: new FormControl('', [Validators.required]),
        user_type: new FormControl('', [Validators.required]),
      })
    });
  }

  formSubmit() {
    const data = JSON.parse(localStorage.getItem('data-staff') || '');
    const getId = Number(data[data.length -1]._id)+1
    this.staff = {...this.addStaffForm.value, _id:getId.toString()}
    data.push(this.staff);
    console.log(data);
    localStorage.setItem('data-staff', JSON.stringify(data));
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
