import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MaterialModule } from './material/material.module';
import { EditStaffComponent } from './components/edit-staff/edit-staff.component';
import { DeleteStaffComponent } from './components/delete-staff/delete-staff.component';
import { ModalSpinnerComponent } from './components/modal-spinner/modal-spinner.component';

@NgModule({
  declarations: [AppComponent, StaffListComponent, AddStaffComponent, EditStaffComponent, DeleteStaffComponent, ModalSpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
