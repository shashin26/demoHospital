import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], search: string): any[] {
    if (value.length === 0 || search == '') {
      return value;
    }
    const records: any[] = [];
    for (const user of value) {
      if (user === search) {
        records.push(user);
      }
    }
    return records;
  }
}
