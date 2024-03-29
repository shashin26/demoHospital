import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Record } from './record.model';
import { AppComponent } from '../app.component';
import { AddRecordComponent } from '../add-record/add-record.component';
import { logInOut } from '../services/log-in-out.service';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,DoCheck {
  search!: string;
  error = null;
  @ViewChild(AddRecordComponent) addrecordcomponent!: AddRecordComponent;
  currentPage = 1;
  itemsPerPage = 10;

  records: Record[] = [];

  constructor(
    private router: Router,
    private recordService: RecordService,
    private http: HttpClient,
    private logInOut: logInOut
  ) {}

  ngOnInit() {
    this.getRecords();
    // console.log(this.logInOut.isLoggedIn);
  }

  ngDoCheck(): void {
    // if (this.search){
    //   this.currentPage=1
    // }
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

  goToPage(): void {
    if (this.currentPage > 0 && this.currentPage <= this.totalPages) {
      // Navigate to the specified page
      // You can modify the route path based on your application's routing configuration
      this.router.navigate(['/home'], {
        queryParams: { page: this.currentPage },
      });
    } else {
      // Reset the currentPage value to the nearest valid page
      if (this.currentPage <= 0) {
        this.currentPage = 1;
      } else if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }

  addRecord() {
    this.router.navigate(['/addRecord'], { queryParams: { action: 'create' } });
  }

  updateRecord(record: Record) {
    //console.log(record);
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
    this.recordService.getRecords().subscribe(
      (sortedRecords: Record[]) => {
        //console.log(sortedRecords);

        this.records = sortedRecords;
        this.error = null;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
}
