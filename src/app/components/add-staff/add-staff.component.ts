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
import { ModalSpinnerComponent } from '../modal-spinner/modal-spinner.component';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent implements OnInit {
  addStaffForm: any 
  staff: any;
  errorEmail: Boolean = true

  constructor(
    private dialogRef: MatDialogRef<AddStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addStaffForm = new FormGroup<any>({
      office_phone: new FormControl(''),
      mobile_phone: new FormControl(''),
      direct_line: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      civility: new FormControl('', [Validators.required]),
      company: new FormGroup({
        select_entity: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        user_type: new FormControl('', [Validators.required]),
      })
    });
    console.log(this.addStaffForm)
  }

  formSubmit() {
    const data = JSON.parse(localStorage.getItem('data-staff') || '');
    const getId = Number(data[data.length -1]._id)+1
    this.staff = {...this.addStaffForm.value, _id:getId.toString(), user_status: 'pending'}
    data.push(this.staff);
    console.log(data);
    localStorage.setItem('data-staff', JSON.stringify(data));
    this.dialogRef.close();
    const spinner = this.modal.open(ModalSpinnerComponent)
    setTimeout(() => {
      spinner.close()
    },3000)
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
      this.snackbar.open('Email Available', 'X', {
        duration: 1500
      })
    } else if (this.addStaffForm.controls.email.status === "INVALID") {
      this.errorEmail = true
      this.snackbar.open('Email Invalid', 'X', {
        duration: 1500
      })
    } else {
      this.errorEmail = true
      this.snackbar.open('Email Unavailable', 'X', {
        duration: 1500
      })
    }
  }

  close() {
    this.dialogRef.close();
  }

  openLoadingSpinner() {
    this.modal.open(ModalSpinnerComponent)
  }
}
