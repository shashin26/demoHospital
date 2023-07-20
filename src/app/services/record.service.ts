import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Record } from '../home/record.model';
import { RecordModel } from '../add-record/record-get.model';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private http: HttpClient) {}
  sortedRecords: Record[] = [];

  getRecords() {
    this.sortedRecords = [];
    return this.http
      .get<{ [key: string]: Record }>(
        'https://userdata-89ae3-default-rtdb.firebaseio.com/records.json'
      )
      .pipe(
        map((response) => {
          for (const [key, value] of Object.entries(response)) {
            value.key = key;
            this.sortedRecords.push(value);
          }
          // Sort the records array based on the room number
          return this.sortedRecords.sort((a, b) => {
            // Assuming roomNo is a number, if it's a string, use parseInt(a.roomNo) and parseInt(b.roomNo) instead
            return parseInt(a.roomNo) - parseInt(b.roomNo);
          });
        })
      );
  }

  addRecord(record: RecordModel) {
    return this.http.post(
      'https://userdata-89ae3-default-rtdb.firebaseio.com/records.json',
      record
    );
  }

  updateRecord(id: string, record: RecordModel) {
    return this.http.put(
      `https://userdata-89ae3-default-rtdb.firebaseio.com/records/${id}.json`,
      record
    );
  }

  deleteRecord(id: string) {
    return this.http.delete(
      `https://userdata-89ae3-default-rtdb.firebaseio.com/records/${id}.json`
    );
  }

  // Fetch record data by ID
  fetchRecordData(id: string) {
    return this.http.get<RecordModel>(
      `https://userdata-89ae3-default-rtdb.firebaseio.com/records/${id}.json`
    );
  }
}
