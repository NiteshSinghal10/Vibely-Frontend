import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {

  transform(value: Date | string | undefined): string {

    if(!value) {
      return '';
    }

    const date = new Date(value);  // user's local timezone
    const now = new Date();        // user's local timezone

    // Normalize both to midnight (local timezone)
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateMid = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffMs = todayMid.getTime() - dateMid.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    // If date is today → return only time
    if (diffDays === 0) {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(date);
    }

    // Yesterday
    if (diffDays === 1) {
      return 'Yesterday';
    }

    // Within last 7 days → weekday name
    if (diffDays < 7) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long'
      }).format(date);
    }

    // Otherwise, return normal date
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

}
