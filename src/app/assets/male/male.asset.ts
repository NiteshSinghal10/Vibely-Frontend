import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-male',
  imports: [],
  templateUrl: './male.asset.svg'
})
export class MaleAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill = '18';
  @Input() class = '#FF0000';
}
