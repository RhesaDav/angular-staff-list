import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-staff',
  templateUrl: './delete-staff.component.html',
  styleUrls: ['./delete-staff.component.scss']
})
export class DeleteStaffComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteStaffComponent>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  handleConfirmDelete () {
    console.log(this.data)
    this.data.list.forEach((element:any, index:any) => {
      if (element._id === this.data.id) this.data.list.splice(index,1)
    });
    localStorage.setItem('data-staff', JSON.stringify(this.data.list))
    this.snackbar.open('delete success', 'X')
    this.dialogRef.close()
  }

}
