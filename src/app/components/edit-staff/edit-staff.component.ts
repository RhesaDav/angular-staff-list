import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  editStaffForm: any
  errorEmail: Boolean = true

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private dialoRgRef: MatDialogRef<EditStaffComponent>
  ) { }

  ngOnInit(): void {
    console.log('data modal', this.data)
    this.createForm()
  }

  createForm() {
    this.editStaffForm = new FormGroup<any>({
      office_phone: new FormControl(''),
      mobile_phone: new FormControl(''),
      direct_line: new FormControl(''),
      select_entity: new FormControl(''),
      email: new FormControl(this.data.dataDetail.email, [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      civility: new FormControl('', [Validators.required]),
      company: new FormGroup({
        name: new FormControl('', [Validators.required]),
        user_type: new FormControl('', [Validators.required]),
      })
    });
    console.log(this.editStaffForm)
  }

  formSubmit() {

  }

  checkEmailAvaibility() {

  }

  close () {
    this.dialoRgRef.close()
  }

}
