import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'summary' })
export class SummaryPipe implements PipeTransform {
  transform(value: string, limit?: number) {
    let actualLimit = limit || 50;
    return value.substring(0, actualLimit) + '..';
  }
}
