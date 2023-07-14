import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../sign-up/user.model';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css'],
})
export class AddRecordComponent implements OnInit {
  @ViewChild('d') addRecordForm!: NgForm;
  record = {
    Name: '',
    roomNo: '',
    mobileNo: '',
    age: '',
  };
  users: User[] = [];
  error = null;
  keys: string[] = [];

  constructor(
    public home: HomeComponent,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // const mode = this.activatedRoute.snapshot.queryParams['mode'];
    // const userString = this.activatedRoute.snapshot.queryParams['user'];
    // let record: any = null;
    // if (mode === 'update' && userString) {
    //   try {
    //     record = JSON.parse(userString);
    //   } catch (error) {
    //     console.error('Error parsing user string:', error);
    //   }
    // }
    // if (record) {
    //   this.OnUpdate(record);
    // }
  }

  OnUpdate(record: any) {
    // console.log(record);
    // this.addRecordForm.form.setValue({
    //   userName: record.userName,
    //   roomNo: record.roomNo,
    //   mobileNo: record.mobileNo,
    //   age: record.age,
    // });
  }

  onFormSubmit() {
    this.record.Name = this.addRecordForm.value.Name;
    this.record.roomNo = this.addRecordForm.value.roomNo;
    this.record.mobileNo = this.addRecordForm.value.mobileNo;
    this.record.age = this.addRecordForm.value.age;
    this.addRecordForm.reset();
    this.http
      .post(
        'https://userdata-89ae3-default-rtdb.firebaseio.com/records.json',
        this.record
      )
      .subscribe((res) => {
        console.log(res);
        //this.getPosts();
        this.home.getRecords();
      });
    //this.postForm.reset();
  }
}
