import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../sign-up/user.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css'],
})
export class AddRecordComponent implements OnInit {
  @ViewChild('f') addRecordForm!: NgForm;
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
    const mode = this.activatedRoute.snapshot.queryParams['mode'];
    console.log(mode);
  }
  OnUpdate(user: any) {
    // this.addRecordForm.form.setValue({
    //   userName: user.userName,
    //   roomNo: user.roomNo,
    //   mobileNo: user.mobileNo,
    //   age: user.age,
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
