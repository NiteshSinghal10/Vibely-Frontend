import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatComponent, IShowChat, ShowChatComponent, ShowChatLoaderComponent } from '../../components';
import { friendMessages } from './dummy';
import { FriendRequestsService, IFriendRequest } from '../../services';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';

@Component({
  selector: 'app-friends-screen',
  imports: [ShowChatComponent, ChatComponent, ReactiveFormsModule, ShowChatLoaderComponent],
  templateUrl: './friends-screen.component.html'
})
export class FriendsScreenComponent implements OnInit, AfterViewInit, OnDestroy {
  private page = 1;
  private limit = 10
  private search: string | null = '';

  private friendsObserver!: IntersectionObserver;

  private subheading = 'Tap to start chatting';
  private defautlProfilePicture = 'profile.svg';

  @ViewChild('friendsElement', { static: false })
  friendsElement!: ElementRef;
  @ViewChild('friendsScrollableContainer', { static: false })
  friendsScrollableElement!: ElementRef;

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

  ngAfterViewInit(): void {
    this.friendsObserver = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          this.hasMoreFriends &&
          !this.isFriendLoading
        ) {
          this.page += 1;
          this.getFriendsRequest();
        }
      },
      {
        root: this.friendsScrollableElement.nativeElement,
        rootMargin: '10px'
      }
    );

    this.friendsObserver.observe(
      this.friendsElement.nativeElement
    );
  }

  ngOnDestroy(): void {
    if(this.friendsObserver) {
      this.friendsObserver.disconnect();
    }
  }

  friendsRequests: IFriendRequest[] = [];
  selectedUser?: IShowChat;
  users: IShowChat[] = []
  messages = friendMessages;
  myUserId = 'b';
  hasMoreFriends = true;
  isFriendLoading = false;
  
  clickChat(user: IShowChat) {
    this.selectedUser = user;
    this.users = this.users.map(userDetail => (userDetail.value === user.value ? { ...userDetail, isSelected: true } : { ...userDetail, isSelected: false }))
  }

  getFriendsRequest() {
    this.isFriendLoading = true;
    this.friendRequestsService.getFriends(this.search, this.page, this.limit)
    .pipe(
      finalize(() => this.isFriendLoading = false)
    )
    .subscribe(response => {
      this.friendsRequests = response.data;

      const users = this.friendsRequests.map(friend => ({
        value: friend.to._id,
        imgSrc: friend.to.picture ?? this.defautlProfilePicture,
        name: `${friend.to.firstName} ${friend.to.lastName}`,
        isOnline: true,
        subHeading: this.subheading,
        isSelected: !!(this.selectedUser?.value === friend.to._id)
      }));

      this.users = [ ...this.users, ...users ];

      if(users.length < 1 || users.length < this.limit) {
        this.hasMoreFriends = false;
      }
    });
  }
}
