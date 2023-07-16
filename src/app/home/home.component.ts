import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Record } from './record.model';
import { AppComponent } from '../app.component';
import { AddRecordComponent } from '../add-record/add-record.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  addrecord = true;
  updaterecord = true;
  deleterecord = true;
  search: string = '';
  error = null;
  @ViewChild(AddRecordComponent) addrecordcomponent!: AddRecordComponent;

  records: Record[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private appcomponent: AppComponent
  ) { }

  ngOnInit() {
    this.getRecords();
  }

  addRecord() {
    this.router.navigate(['/addRecord'], { queryParams: { mode: 'create' } });
  }

  updateRecord(record: Record) {
    // this.addrecordcomponent.OnUpdate(record);
    this.router.navigate(['/addRecord'], {
      queryParams: { mode: 'update' },
    });
  }

  onDelete(record: Record) {
    this.router.navigate(['/addRecord'], { queryParams: { mode: 'delete' } });
  }
  getRecords() {
    this.records = [];
    this.http
      .get<{ [key: string]: Record }>(
        'https://userdata-89ae3-default-rtdb.firebaseio.com/records.json'
      )
      .pipe(
        map((response) => {
          //console.log(response);
          for (const [key, value] of Object.entries(response)) {
            this.records.push(value);
            this.error = null;
          }
          return this.records;
        })
      )
      .subscribe(
        (response: Record[]) => {
          //console.log(response);
        },
        (error) => {
          this.error = error.message;
        }
      );
  }

  ngOnDestroy(): void {
    this.appcomponent.isLoggedIn = false;
  }
}
