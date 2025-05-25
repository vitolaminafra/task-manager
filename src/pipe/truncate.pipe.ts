import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length?: number): string {
    const limit = length ?? 50;
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
