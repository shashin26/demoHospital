import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../sign-up/user.model';
import { RecordModel } from './record-get.model';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css'],
})
export class AddRecordComponent implements OnInit {
  @ViewChild('d') addRecordForm!: NgForm;
  record: RecordModel = {
    Name: '',
    roomNo: '',
    mobileNo: '',
    age: '',
  };
  users: User[] = [];
  error = null;
  keys: string[] = [];
  addrecord = true;
  updaterecord = true;
  deleterecord = true;
  id: string | null = null;

  constructor(
    public home: HomeComponent,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('Query Parameters:', params);
      const action = params['action'];
      this.id = params['id'];

      if (action == 'create') {
        this.addrecord = false;
        this.updaterecord = true;
        this.deleterecord = true;
      } else if (action == 'update') {
        this.addrecord = true;
        this.updaterecord = false;
        this.deleterecord = true;
        if (this.id) {
          // Fetch the record data by ID and assign it to the input fields
          this.fetchRecordData(this.id);
        }
      } else if (action == 'delete') {
        this.addrecord = true;
        this.updaterecord = true;
        this.deleterecord = false;
        if (this.id) {
          // Fetch the record data by ID and assign it to the input fields
          this.fetchRecordData(this.id);
        }
      }
    });
  }

  fetchRecordData(id: string) {
    // Perform an HTTP request or any other method to fetch the record data by ID
    // For example:
    this.http
      .get<RecordModel>(`https://userdata-89ae3-default-rtdb.firebaseio.com/records/${id}.json`)
      .subscribe((response) => {
        if (response) {
          this.record = response;
        }
      });
  }

  onFormSubmit() {
    if (!this.id) {
      // Save operation
      this.http
        .post(
          'https://userdata-89ae3-default-rtdb.firebaseio.com/records.json',
          this.record
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.home.getRecords();
          },
          (error) => {
            console.error('Error:', error);
            // Handle the error accordingly (display error message, perform fallback action, etc.)
          }
        );
    } else {
      // Update operation
      this.http
        .put(
          `https://userdata-89ae3-default-rtdb.firebaseio.com/records/${this.id}.json`,
          this.record
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.home.getRecords();
          },
          (error) => {
            console.error('Error:', error);
            // Handle the error accordingly (display error message, perform fallback action, etc.)
          }
        );
    }
  }
}