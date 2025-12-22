import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-down-arrow',
  imports: [],
  templateUrl: './down-arrow.asset.svg'
})
export class DownArrowAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill = '#ff0000';
  @Input() class = '';
}
