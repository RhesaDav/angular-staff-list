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
import { MatSnackBar } from '@angular/material/snack-bar';
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
  errorEmail: Boolean = true

  constructor(
    private dialogRef: MatDialogRef<AddStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private http: HttpCommonService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addStaffForm = new FormGroup<any>({
      office_phone: new FormControl(''),
      mobile_phone: new FormControl(''),
      direct_line: new FormControl(''),
      select_entity: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      civility: new FormControl('', [Validators.required]),
      company: new FormGroup({
        name: new FormControl('', [Validators.required]),
        user_type: new FormControl('', [Validators.required]),
      })
    });
    console.log(this.addStaffForm)
  }

  formSubmit() {
    const data = JSON.parse(localStorage.getItem('data-staff') || '');
    const getId = Number(data[data.length -1]._id)+1
    this.staff = {...this.addStaffForm.value, _id:getId.toString()}
    data.push(this.staff);
    console.log(data);
    localStorage.setItem('data-staff', JSON.stringify(data));
    // this.dialogRef.close();
  }

  checkEmailAvaibility () {
    const data = JSON.parse(localStorage.getItem('data-staff') || '');
    console.log(data)
    const checkEmail = data.find((item:any) =>
      item.email === this.addStaffForm.value.email
    )
    console.log(this.addStaffForm)
    if (!checkEmail && this.addStaffForm.controls.email.status === "VALID") {
      this.errorEmail = false
      this.snackbar.open('Email Available', 'X')
    } else if (this.addStaffForm.controls.email.status === "INVALID") {
      this.errorEmail = true
      this.snackbar.open('Email Invalid', 'X')
    } else {
      this.errorEmail = true
      this.snackbar.open('Email Unavailable', 'X')
    }
  }

  close() {
    this.dialogRef.close();
  }
}
