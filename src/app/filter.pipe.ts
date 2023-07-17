import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return (
        item.Name.toLowerCase().includes(searchText) ||
        item.roomNo.toLowerCase().includes(searchText) ||
        item.mobileNo.toLowerCase().includes(searchText) ||
        item.age.toLowerCase().includes(searchText)
      );
    });
  }
}
