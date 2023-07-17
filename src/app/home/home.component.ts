import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Record } from './record.model';
import { AppComponent } from '../app.component';
import { AddRecordComponent } from '../add-record/add-record.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  search: string = '';
  error = null;
  @ViewChild(AddRecordComponent) addrecordcomponent!: AddRecordComponent;
  currentPage = 1;
  itemsPerPage = 10;

  records: Record[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private appcomponent: AppComponent
  ) {}

  ngOnInit() {
    this.getRecords();
  }

  addRecord() {
    this.router.navigate(['/addRecord'], { queryParams: { action: 'create' } });
  }
  get totalPages(): number {
    return Math.ceil(this.records.length / this.itemsPerPage);
  }
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  updateRecord(record: Record) {
    this.router.navigate(['/addRecord'], {
      queryParams: { action: 'update', id: record.key },
    });
  }

  onDelete(record: Record) {
    this.router.navigate(['/addRecord'], {
      queryParams: { action: 'delete', id: record.key },
    });
  }

  getRecords() {
    this.records = [];
    this.http
      .get<{ [key: string]: Record }>(
        'https://userdata-89ae3-default-rtdb.firebaseio.com/records.json'
      )
      .pipe(
        map((response) => {
          for (const [key, value] of Object.entries(response)) {
            value.key = key; // Assign the ID from the response to the record object
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
