import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CircleAsset } from '../../assets';
import { IShowChat } from './show-chat.types';
import { RelativeDatePipe, UtcToLocalPipe } from '../../pipes';

@Component({
  selector: 'app-show-chat',
  imports: [CircleAsset, RelativeDatePipe],
  templateUrl: './show-chat.component.html'
})
export class ShowChatComponent {
  @Input() user: IShowChat = {
    value: '1',
    imgSrc: 'https://lh3.googleusercontent.com/a/ACg8ocKUuawnhXl1UWaHhNiqWRjrtARXEOUuRtpcCN9ANPJHD3-c3pL5=s100',
    name: 'Badal Paji',
    isOnline: true,
    subHeading: 'Tap to start chatting'
  }

  @Input() onlineColor = '#15803D';

  @Input() offlineColor = 'white';

  @Output() chatClicked = new EventEmitter();

  get color() {
    return this.user.isOnline ? this.onlineColor : this.offlineColor
  }

  get userImg() {
    return this.user.imgSrc;
  }

  get isSelected() {
    return !!(this.user.isSelected);
  }

  get newMessagesCount() {
    return this.user.newMessages;
  }

  chatClick() {
    this.chatClicked.emit();
  }
}
