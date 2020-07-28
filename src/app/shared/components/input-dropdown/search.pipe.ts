import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class Search implements PipeTransform {
  transform(locked: any, query: string): any {
    if(!query) {
      return locked;
    }
    return locked.filter((lock) => {
      return lock.description.toLowerCase().includes(query.toLowerCase());
    });
  }
}