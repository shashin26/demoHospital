import { Pipe, PipeTransform } from '@angular/core';
import { Record } from '../app/home/record.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(records: Record[], search: string): Record[] {
    if (!search) {
      return records;
    }

    return records.filter((record) => {
      return (
        record.Name.toLowerCase().includes(search.toLowerCase()) ||
        record.roomNo.toLowerCase().includes(search.toLowerCase()) ||
        record.mobileNo.toLowerCase().includes(search.toLowerCase()) ||
        record.age.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
