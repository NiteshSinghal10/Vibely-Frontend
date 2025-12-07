import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-circle',
  imports: [],
  templateUrl: './circle.asset.svg'
})
export class CircleAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill = '#ff0000';
  @Input() class = '';
}
