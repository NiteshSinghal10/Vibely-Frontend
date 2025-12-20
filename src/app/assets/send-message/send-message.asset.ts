import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-send-message',
  imports: [],
  templateUrl: './send-message.asset.svg'
})
export class SendMessageAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill = '#ff0000';
  @Input() class = '';
}
