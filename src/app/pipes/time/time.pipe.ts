import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(
    value: Date | string | undefined,
    format: '12' | '24' = '12',
    showSeconds: boolean = false,
    locale: string = 'en-US'
  ): string {

    if (!value) {
      return '';
    }

    const date = value instanceof Date ? value : new Date(value);

    if (isNaN(date.getTime())) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12: format === '12'
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
  }

}
