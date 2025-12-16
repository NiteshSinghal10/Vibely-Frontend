import { Component, OnInit } from '@angular/core';
import { ChatComponent, IShowChat, ShowChatComponent } from '../../components';
import { friendMessages } from './dummy';
import { FriendRequestsService, IFriendRequest } from '../../services';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-friends-screen',
  imports: [ShowChatComponent, ChatComponent, ReactiveFormsModule],
  templateUrl: './friends-screen.component.html'
})
export class FriendsScreenComponent implements OnInit {
  private page = 1;
  private limit = 10
  private search: string | null = '';

  private subheading = 'Tap to start chatting';
  private defautlProfilePicture = 'profile.svg';

  constructor(private friendRequestsService: FriendRequestsService) {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(value => {
      this.search = value;
      this.getFriendsRequest()
    });
  }

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.getFriendsRequest()
  }

  friendsRequests: IFriendRequest[] = [];
  selectedUser?: IShowChat;
  users: IShowChat[] = []
  messages = friendMessages;
  myUserId = 'b';
  
  clickChat(user: IShowChat) {
    this.selectedUser = user;
    this.users = this.users.map(userDetail => (userDetail.value === user.value ? { ...userDetail, isSelected: true } : { ...userDetail, isSelected: false }))
  }

  getFriendsRequest() {
    this.friendRequestsService.getFriends(this.search, this.page, this.limit).subscribe(response =>{
      this.friendsRequests = response.data;

      this.users = this.friendsRequests.map(friend => ({
        value: friend.to._id,
        imgSrc: friend.to.picture ?? this.defautlProfilePicture,
        name: `${friend.to.firstName} ${friend.to.lastName}`,
        isOnline: true,
        subHeading: this.subheading,
        isSelected: !!(this.selectedUser?.value === friend.to._id)
      }))
    });
  }
}
