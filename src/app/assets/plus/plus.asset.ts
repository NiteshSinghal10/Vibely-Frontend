import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plus',
  imports: [],
  templateUrl: './plus.asset.svg'
})
export class PlusComponent {
  @Input() height = '20';
  @Input() width = '20';
  @Input() fill = '#ff0000';
  @Input() class = '';
}
