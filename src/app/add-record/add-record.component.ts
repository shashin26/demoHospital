import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../sign-up/user.model';
import { RecordModel } from './record-get.model';
import { RecordService } from '../services/record.service';

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
  error: string | null = null;
  keys: string[] = [];
  addrecord = true;
  updaterecord = true;
  deleterecord = true;
  id: string = '';

  constructor(
    public home: HomeComponent,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      //console.log('Query Parameters:', params);
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
    this.recordService.fetchRecordData(id).subscribe(
      (response) => {
        if (response) {
          this.record = response;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onFormSubmit() {
    if (!this.id) {
      // New entry: Check if the room number already exists in the records list
      this.recordService.getRecords().subscribe(
        (records) => {
          const isRoomNumberOccupied = records.some(
            (record) => record.roomNo === this.record.roomNo
          );

          if (isRoomNumberOccupied) {
            // Room number is already occupied
            this.error = 'Room number is already occupied.';
          } else {
            // Room number is not occupied
            this.recordService.addRecord(this.record).subscribe(
              (res) => {
                //console.log(res);
                this.home.getRecords();
                this.router.navigate(['/home']);
              },
              (error) => {
                console.error('Error:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      // Update operation: Check if room number is changed
      this.recordService.fetchRecordData(this.id).subscribe(
        (record) => {
          if (record && record.roomNo === this.record.roomNo) {
            // Room number is not changed, proceed with the update
            this.recordService.updateRecord(this.id, this.record).subscribe(
              (res) => {
                //console.log(res);
                this.router.navigate(['/home']);
              },
              (error) => {
                console.error('Error:', error);
              }
            );
          } else {
            // Room number is changed: Check if the new room number is already occupied
            this.recordService.getRecords().subscribe(
              (records) => {
                const isRoomNumberOccupied = records.some(
                  (record) => record.roomNo === this.record.roomNo
                );

                if (isRoomNumberOccupied) {
                  // Room number is already occupied
                  this.error = 'Room number is already occupied.';
                } else {
                  // Room number is not occupied, proceed with the update
                  this.recordService
                    .updateRecord(this.id, this.record)
                    .subscribe(
                      (res) => {
                        //console.log(res);
                        this.router.navigate(['/home']);
                      },
                      (error) => {
                        console.error('Error:', error);
                      }
                    );
                }
              },
              (error) => {
                console.error('Error:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  onDelete() {
    if (this.id) {
      this.recordService.deleteRecord(this.id).subscribe(
        (res) => {
          // console.log(res);
          this.home.getRecords();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}
