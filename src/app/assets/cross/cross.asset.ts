import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-cross',
  imports: [],
  templateUrl: './cross.asset.svg'
})
export class CrossAsset {
  @Input() height = '18';
  @Input() width = '18';
}
