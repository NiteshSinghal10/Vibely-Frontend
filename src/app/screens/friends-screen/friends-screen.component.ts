import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatComponent, FriendMessages, IChatUser, IMessage, IShowChat, ShowChatComponent, ShowChatLoaderComponent } from '../../components';
import { FriendService, LocalStorageService, MessageService, SocketService } from '../../services';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { IFriend, IUser } from '../../interfaces';
import { generateChatId } from '../../common-methods';

@Component({
  selector: 'app-friends-screen',
  imports: [ShowChatComponent, ChatComponent, ReactiveFormsModule, ShowChatLoaderComponent],
  templateUrl: './friends-screen.component.html'
})
export class FriendsScreenComponent implements OnInit, AfterViewInit, OnDestroy {
  private page = 1;
  private limit = 10;
  private messagePage = 1;
  private messageLimit = 30;
  private search: string | null = '';

  private friendsObserver!: IntersectionObserver;
  private _selectedUser?: IFriend;

  private subheading = 'Tap to start chatting';
  private defautlProfilePicture = 'profile.svg';

  @ViewChild('friendsElement', { static: false })
  friendsElement!: ElementRef;
  @ViewChild('friendsScrollableContainer', { static: false })
  friendsScrollableElement!: ElementRef;

  constructor(
    private friendService: FriendService,
    private localStorageService: LocalStorageService,
    private socketService: SocketService,
    private messageService: MessageService
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

  private groupMessages (rawMessages: IMessage[]) {
    const groupedMessages: Record<string, IMessage[]> = {};

    rawMessages.forEach(message => {
      const date = new Date(message.createdAt);
      const dateStr = date.toLocaleDateString('hi-IN');
  
      const [day, month, year] = dateStr.split('/').map(Number);
  
      const key = `${year.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000+00:00`;
    
      if (!groupedMessages[key]) {
        groupedMessages[key] = [];
      }
    
      groupedMessages[key].push(message);
    })
  
    const groupedArray = Object.keys(groupedMessages).map(dateStr => ({
        date: dateStr,
        messages: groupedMessages[dateStr]
      }));
  
    return groupedArray;
  }

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.getFriendsRequest()
    this.receiveMessage();
    this.messageDeleted();
    this.messageEdited();
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

  friends: IFriend[] = [];
  users: IShowChat[] = []
  messages: FriendMessages[] = [];
  hasMoreFriends = true;
  isFriendLoading = false;
  hasMessageMore = true;
  isMessageLoading = false;
  
  clickChat(user: IShowChat) {
    const friendData = this.friends.find(friend => String(friend.friendDetail?._id) === String(user.value));
    this.selectedUser = friendData;
    this.users = this.users.map(userDetail => (userDetail.value === user.value ? { ...userDetail, isSelected: true } : { ...userDetail, isSelected: false }));
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
        value: friend.friendDetail?._id || '',
        imgSrc: friend.friendDetail?.picture ?? this.defautlProfilePicture,
        name: `${friend.friendDetail?.firstName} ${friend.friendDetail?.lastName}`,
        isOnline: friend.isOnline,
        subHeading: this.subheading,
        isSelected: !!(String(this.selectedUser?._id) === String(friend.friendDetail?._id))
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

  get selectedUser(): IUser | undefined {
    return this._selectedUser?.friendDetail;
  }
  
  set selectedUser(user: IFriend | undefined) {
    this._selectedUser = user;
  
    this.messages = [];
    this.messagePage = 1;
    this.getMessagesData();
  }

  get selectedUserData(): IChatUser {
    return {
      value: this.selectedUser?._id || '',
      imgSrc: this.selectedUser?.picture || this.defautlProfilePicture,
      name: `${this.selectedUser?.firstName} ${this.selectedUser?.lastName}`
    }
  }

  getMessagesData() {
    if(this.selectedUser) {
      // start loader
      this.isMessageLoading = true;

      this.messageService.getMessages(this.selectedUser?._id || '', this.messagePage, this.messageLimit)
      .pipe(
        finalize(() => this.isMessageLoading = false)
      )
      .subscribe(data => {
        this.messages = [...this.messages, ...this.groupMessages(data.data)];

        if(data.data.length === 0 || data.data.length < this.messageLimit) {
          this.hasMessageMore = false;
        }
      })
    }
  }

  sendMessage({ message, _replyMessage }: { message: string, _replyMessage?: string }) {
    this.socketService.emit('sendMessage',{
      chatId: generateChatId(this.selectedUser?._id || '', this.myUserDetail?._id || ''),
      _receiver: this.selectedUser?._id || '',
      content: message,
      _friend: this._selectedUser?._id || '',
      ...(_replyMessage ? { _replyMessage } : {})
    })
  }

  receiveMessage() {
    this.socketService.on('sentMessage').subscribe(message => {
      const messageWithDate = this.groupMessages([message]);

      const messageIndex = this.messages.findIndex(messageDate => messageDate.date === messageWithDate[0].date);

      if(messageIndex !== -1) {
        this.messages[messageIndex].messages = [message, ...this.messages[messageIndex].messages]
      } else {
        this.messages = [...messageWithDate, ...this.messages];
      }
    })
  }

  removeMessageFromListing (_id: string) {
    this.messages = this.messages
    .map(groupMessage => {
      const messages = groupMessage.messages.filter(
        singleMessage => String(singleMessage._id) !== String(_id)
      );

      return {
        ...groupMessage,
        messages
      };
    })
    .filter(groupMessage => groupMessage.messages.length > 0);
  }

  updateMessageFromList (message: IMessage) {
    this.messages = this.messages
    .map(groupMessage => {
      const messages = groupMessage.messages.map(messageData => {
        if(messageData._id.toString() === message._id.toString()) {
          return {
            ...messageData,
            content: message.content
          }
        }

        return messageData;
      })

      return {
        ...groupMessage,
        messages
      };
    });
  }

  messageDeleted() {
    this.socketService.on('messageDeleted').subscribe(message => {
      this.removeMessageFromListing(message._id)
    })
  }

  messageEdited() {
    this.socketService.on('messageEdited').subscribe(message => {
      this.updateMessageFromList(message);
    })
  }

  loadMoreMessages() {
    this.messagePage = this.messagePage + 1;
    this.getMessagesData();
  }

  deleteMessage(_id: string) {
    this.socketService.emit("deleteMessage", { _id });
  }

  editMessage(message: IMessage) {
    this.socketService.emit("editMessage", message);
  }
}
