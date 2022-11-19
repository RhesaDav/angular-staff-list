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
    this.createForm()
    // this.getEmployee()
    // this.getEmployee()
  }

  createForm() {
    this.editStaffForm = new FormGroup<any>({
      office_phone: new FormControl(''),
      mobile_phone: new FormControl(''),
      direct_line: new FormControl(''),
      select_entity: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      position: new FormControl(''),
      civility: new FormControl('', [Validators.required]),
      company: new FormGroup({
        name: new FormControl('', [Validators.required]),
        user_type: new FormControl('', [Validators.required]),
      })
    });
    const data = this.data.dataDetail
    this.editStaffForm.patchValue({
      office_phone: data.office_phone ? data.office_phone : '',
      mobile_phone: data.mobile_phone ? data.mobile_phone : '',
      direct_line: data.direct_line ? data.direct_line : '',
      select_entity: data.select_entity? data.select_entity : '',
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      position: data.position ? data.position : '',
      civility: data.civility,
      company: {
        name: data.company.name,
        user_type: data.company.user_type,
      }
    })
  }

  getEmployee() {
    this.editStaffForm = this.data.dataDetail
}
  
  editForm (data:any) {
    const found = this.data.staffList.findIndex((item:any) => 
      item._id === data._id
    )
    console.log(this.editStaffForm.value)
    this.data.staffList[found] = this.editStaffForm.value
    console.log(this.data.staffList)
    localStorage.setItem("data-staff", JSON.stringify(this.data.staffList))
    // this.editStaffForm = this.data.dataDetail
    // this.editStaffForm.patchValue({
    //   office_phone: data.office_phone,
    //   mobile_phone: data.mobile_phone,
    //   direct_line: data.data,
    //   select_entity: data.select_entity,
    //   email: data.email,
    //   first_name: data.first_name,
    //   last_name: data.last_name,
    //   position: data.position,
    //   civility: data.civility,
    //   company: {
    //     name: data.company.name,
    //     user_type: data.company.user_type,
    //   }
    // })
    // console.log(this.editStaffForm)
  }
  
  formSubmit() {

  }

  checkEmailAvaibility() {

  }

  close () {
    this.dialoRgRef.close()
  }

}
