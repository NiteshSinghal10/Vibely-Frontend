import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-correct',
  imports: [],
  templateUrl: './correct.asset.svg'
})
export class CorrectAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill = '#ff0000';
  @Input() class = '';
}
