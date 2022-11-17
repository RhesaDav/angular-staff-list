import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { HttpCommonService } from 'src/app/services/http-common.service';
import { AddStaffComponent } from '../add-staff/add-staff.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'userType', 'entity', 'status', 'action'];
  dataSource = new Array<any>()

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

  detailStaff (id:any) {
    console.log(id)
    const data = this.dataSource.find(item => item._id === id)
    console.log(data)
  }

  openModal() {
    let dialogRef = this.modal.open(AddStaffComponent)
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData()
    })
  }

}
