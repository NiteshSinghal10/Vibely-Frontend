import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tailwindColor'
})
export class TailwindColorPipe implements PipeTransform {

  transform(colorName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(colorName)
      .trim();
  }

}
