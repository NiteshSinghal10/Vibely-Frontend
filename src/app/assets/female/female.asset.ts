import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-female',
  imports: [],
  templateUrl: './female.asset.svg'
})
export class FemaleAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill = '18';
  @Input() class = '#FF0000';
}
