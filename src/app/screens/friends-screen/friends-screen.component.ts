import { Component } from '@angular/core';
import { IShowChat, ShowChatComponent } from '../../components';
import { ThreeDotAsset } from '../../assets';
import { friendMessages, friends } from './dummy';

@Component({
  selector: 'app-friends-screen',
  imports: [ShowChatComponent, ThreeDotAsset],
  templateUrl: './friends-screen.component.html'
})
export class FriendsScreenComponent {

  constructor() {

  }


  selectedUser?: IShowChat;
  users = friends;
  messages = friendMessages;
  myUserId = 'b';
  
  clickChat(user: IShowChat) {
    this.selectedUser = user;
    this.users = this.users.map(userDetail => (userDetail.value === user.value ? { ...userDetail, isSelected: true } : { ...userDetail, isSelected: false }))
  }
}
