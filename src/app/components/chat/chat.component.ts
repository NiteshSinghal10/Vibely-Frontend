import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IChatUser, IMessage } from './chat.types';
import { SendMessageAsset, ThreeDotAsset } from '../../assets';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [ThreeDotAsset, SendMessageAsset, FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent {
  @Input() selectedUser: IChatUser = {
    value: 'a',
    name: 'Nitesh',
    imgSrc: 'profile.svg'
  }

  @Input() myUserId = 'b';

  @Input() width = '100%';

  @Input() height = '100%';

  @Input() messages: IMessage[] = [];

  message = '';

  @Output() sendMessage = new EventEmitter<string>();

  messageSend() {
    this.sendMessage.emit(this.message);
    this.message = '';
  }
}
