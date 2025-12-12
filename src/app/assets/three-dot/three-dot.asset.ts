import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-three-dot',
  imports: [],
  templateUrl: './three-dot.asset.svg'
})
export class ThreeDotAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill = '#000000';
  @Input() class = '';
}
