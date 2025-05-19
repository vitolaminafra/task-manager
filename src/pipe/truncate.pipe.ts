import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {
    const limit = 50;
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
