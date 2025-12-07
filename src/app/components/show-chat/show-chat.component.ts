import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CircleAsset } from '../../assets';
import { IShowChat } from './show-chat.types';

@Component({
  selector: 'app-show-chat',
  imports: [CircleAsset],
  templateUrl: './show-chat.component.html'
})
export class ShowChatComponent {
  @Input() user: IShowChat = {
    imgSrc: 'https://lh3.googleusercontent.com/a/ACg8ocKUuawnhXl1UWaHhNiqWRjrtARXEOUuRtpcCN9ANPJHD3-c3pL5=s100',
    name: 'Badal Paji',
    onlineColor: '#15803D',
    offlineColor: 'white',
    isOnline: true,
    subHeading: 'Tap to start chatting'
  }

  @Output() chatClicked = new EventEmitter();

  get color() {
    return this.user.isOnline ? this.user.onlineColor : this.user.offlineColor
  }

  get userImg() {
    return this.user.imgSrc;
  }

  chatClick() {
    this.chatClicked.emit();
  }
}
