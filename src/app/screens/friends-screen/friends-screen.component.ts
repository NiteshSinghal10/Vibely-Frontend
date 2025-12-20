import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatComponent, IChatUser, IMessage, IShowChat, ShowChatComponent, ShowChatLoaderComponent } from '../../components';
import { FriendService, IFriendRequest, LocalStorageService, SocketService } from '../../services';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { IUser } from '../../interfaces';
import { generateChatId } from '../../common-methods';

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

  constructor(
    private friendService: FriendService,
    private localStorageService: LocalStorageService,
    private socketService: SocketService
  ) {
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
    this.receiveMessage();
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

  friends: IUser[] = [];
  selectedUser?: IUser;
  users: IShowChat[] = []
  messages: IMessage[] = [];
  hasMoreFriends = true;
  isFriendLoading = false;
  
  clickChat(user: IShowChat) {
    const friendData = this.friends.find(friend => String(friend._id) === String(user.value));
    this.selectedUser = friendData;
    this.users = this.users.map(userDetail => (userDetail.value === user.value ? { ...userDetail, isSelected: true } : { ...userDetail, isSelected: false }))
  }

  getFriendsRequest() {
    this.isFriendLoading = true;
    this.friendService.getFriends(this.search, this.page, this.limit)
    .pipe(
      finalize(() => this.isFriendLoading = false)
    )
    .subscribe(response => {
      this.friends = response.data;

      const users = this.friends.map(friend => ({
        value: friend._id,
        imgSrc: friend.picture ?? this.defautlProfilePicture,
        name: `${friend.firstName} ${friend.lastName}`,
        isOnline: true,
        subHeading: this.subheading,
        isSelected: !!(String(this.selectedUser?._id) === String(friend._id))
      }));

      this.users = [ ...this.users, ...users ];

      if(users.length < 1 || users.length < this.limit) {
        this.hasMoreFriends = false;
      }
    });
  }

  get myUserDetail() {
    const user = this.localStorageService.getItem<IUser>('user');

    return user;
  }

  get selectedUserData(): IChatUser {
    return {
      value: this.selectedUser?._id || '',
      imgSrc: this.selectedUser?.picture || this.defautlProfilePicture,
      name: `${this.selectedUser?.firstName} ${this.selectedUser?.lastName}`
    }
  }

  sendMessage(message: string) {
    this.socketService.emit('sendMessage',{
      chatId: generateChatId(this.selectedUser?._id || '', this.myUserDetail?._id || ''),
      _receiver: this.selectedUser?._id || '',
      content: message
    })
  }

  receiveMessage() {
    this.socketService.on('sentMessage').subscribe(message => {
      this.messages.push(message)
    })
  }
}
