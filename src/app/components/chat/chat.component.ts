import { Component, Input } from '@angular/core';
import { IMessage } from './chat.types';
import { IShowChat } from '../show-chat';
import { ThreeDotAsset } from '../../assets';

@Component({
  selector: 'app-chat',
  imports: [ThreeDotAsset],
  templateUrl: './chat.component.html'
})
export class ChatComponent {
  @Input() selectedUser: IShowChat = {
    value: 'a',
    name: 'Nitesh',
    imgSrc: 'profile.svg'
  }

  @Input() myUserId = 'b';

  @Input() width = '100%';

  @Input() height = '100%';

  @Input() messages: IMessage[] = [];
}
