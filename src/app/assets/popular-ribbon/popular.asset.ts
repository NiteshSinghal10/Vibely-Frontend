import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-popular',
  imports: [],
  templateUrl: './popular.asset.svg'
})
export class PopularAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill1 = '#C0392B';
  @Input() fill2 = '#E74C3C';
}
