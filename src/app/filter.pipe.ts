import { Pipe, PipeTransform } from '@angular/core';
import { Record } from '../app/home/record.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  constructor() {
    console.log('implements filter');
  }
  transform(value: any[], search: string): any[] {
    if (value.length === 0 || search == '') {
      console.log('empty worked');

      return value;
    }
    console.log('not empty worked');
    const records: Record[] = [];
    for (const record of value) {
      console.log('not empty worked 2');
      if (record === search) {
        console.log('not empty worked 3');
        records.push(record);
      }
    }
    return records;
  }
}
