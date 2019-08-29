import { Pipe, PipeTransform } from '@angular/core';

import { MisData } from '../interfaces/mis-data.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: MisData[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
      return items.filter(item => {
        return  item.trackingId.toLowerCase().includes(searchText) ||
                item.assignedTo.toLowerCase().includes(searchText) ||
                item.itemName.toLowerCase().includes(searchText) ||
                item.projectName.toLowerCase().includes(searchText) ||
                item.requestedByBSA.toLowerCase().includes(searchText) ||
                item.currentStatus.toLowerCase().includes(searchText) ||
                item.approvalStatus.toLowerCase().includes(searchText)
      });
   }
}