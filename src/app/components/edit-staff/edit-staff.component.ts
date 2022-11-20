import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalSpinnerComponent } from '../modal-spinner/modal-spinner.component';

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
    private dialoRgRef: MatDialogRef<EditStaffComponent>,
    private modal: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.editStaffForm = new FormGroup<any>({
      office_phone: new FormControl(''),
      mobile_phone: new FormControl(''),
      direct_line: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      position: new FormControl(''),
      civility: new FormControl('', [Validators.required]),
      company: new FormGroup({
        name: new FormControl('', [Validators.required]),
        user_type: new FormControl('', [Validators.required]),
        select_entity: new FormControl(''),
      })
    });
    const data = this.data.dataDetail
    this.editStaffForm.patchValue({
      office_phone: data.office_phone ? data.office_phone : '',
      mobile_phone: data.mobile_phone ? data.mobile_phone : '',
      direct_line: data.direct_line ? data.direct_line : '',
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      position: data.position ? data.position : '',
      civility: data.civility,
      company: {
        name: data.company.name,
        user_type: data.company.user_type,
        select_entity: data.select_entity? data.select_entity : '',
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
    this.data.staffList[found] = {...this.editStaffForm.value, user_status: 'pending'}
    console.log(this.data.staffList)
    let spinnerModal = this.modal.open(ModalSpinnerComponent)
    setTimeout(() => {
      spinnerModal.close()
      localStorage.setItem("data-staff", JSON.stringify(this.data.staffList))
      this.dialoRgRef.close()
      this.snackbar.open('Staff Edited', 'X')
    },3000)
  }

  close () {
    this.dialoRgRef.close()
  }

}
