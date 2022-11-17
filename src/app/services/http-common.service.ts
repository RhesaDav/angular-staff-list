import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const jsonUrl = 'assets/mentor.json'

@Injectable({
  providedIn: 'root',
})
export class HttpCommonService {
  private staffStore = new BehaviorSubject<any>([]);
  staff = this.staffStore.asObservable();

  constructor(private http: HttpClient) {}

  loadAllStaff(): Observable<any> {
    return this.http.get<any> (jsonUrl)
  }

  createStaff(data:any) {
    this.http.post(jsonUrl, data).pipe(map(res => this.staffStore.value.push(res)))
    .subscribe()
  }
}
