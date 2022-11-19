import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { HttpCommonService } from 'src/app/services/http-common.service';
import { AddStaffComponent } from '../add-staff/add-staff.component';
import { DeleteStaffComponent } from '../delete-staff/delete-staff.component';
import { EditStaffComponent } from '../edit-staff/edit-staff.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'userType', 'entity', 'status', 'action'];
  dataSource = new Array<any>()
  dataDetail: any;

  constructor(private http: HttpClient, private modal: MatDialog, public httpService: HttpCommonService) { }

  ngOnInit(): void {
    this.setLocalStorage()
  }

  setLocalStorage() {
    this.httpService.loadAllStaff().subscribe(response => {
      localStorage.setItem('data-staff', JSON.stringify(response))
      this.loadData()
    })
  }

  loadData() {
    const data = localStorage.getItem('data-staff')
    this.dataSource = JSON.parse(data || '')
  }

  openModalDetail (id:any) {
    // console.log(id)
    this.dataDetail = this.dataSource.find(item => item._id === id)
    // console.log(data)
    let dialogRef = this.modal.open(EditStaffComponent, {
      data: {
        dataDetail: this.dataDetail,
        staffList: this.dataSource
      }
    })
    dialogRef.afterClosed().subscribe(() => this.loadData())
  }

  openModalAdd() {
    let dialogRef = this.modal.open(AddStaffComponent)
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData()
    })
  }

  openModalDelete(id: any) {
    let dialogRef = this.modal.open(DeleteStaffComponent, {
      data: {
        id: id,
        detail: this.dataSource.find(item => item._id === id),
        list: this.dataSource
      }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.loadData()
    })
  }

}
