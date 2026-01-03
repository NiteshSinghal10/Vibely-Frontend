import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { IChatUser, FriendMessages, IMessage } from './chat.types';
import { CrossAsset, DownArrowAsset, SendMessageAsset, ThreeDotAsset } from '../../assets';
import { FormsModule } from '@angular/forms';
import { RelativeDatePipe, TimePipe } from '../../pipes';
import { CommonDirective, DropdownDirective } from '../../directives';
import { IDropdownConfig, IOption } from '../dropdown';
import { ChatLoaderComponent } from '../chat-loader';
import { IModal, ModalComponent } from '../modal';
import { OverlayService } from '../../services';

@Component({
  selector: 'app-chat',
  imports: [ThreeDotAsset, SendMessageAsset, FormsModule, RelativeDatePipe, TimePipe, DownArrowAsset, DropdownDirective, ChatLoaderComponent, CrossAsset],
  templateUrl: './chat.component.html'
})
export class ChatComponent extends CommonDirective<ModalComponent> {
  private messagesObserver!: IntersectionObserver;

  private modal: IModal = {
    title: 'Delete This Message',
    subtitle: 'This message will be removed for everyone and cannot be restored.',
    positiveBtnText: 'Delete',
    negativeBtnText: 'Cancel'
  }

  private deleteMessageData!: IMessage;

  @Input() selectedUser: IChatUser = {
    value: 'a',
    name: 'Nitesh',
    imgSrc: 'profile.svg'
  }

  @Input() myUserId = 'b';

  @Input() width = '100%';

  @Input() height = '100%';

  @Input() messages: FriendMessages[] = [];

  @Input() hasMore = false;

  @Input() isLoading = false;

  message = '';

  @Output() sendMessage = new EventEmitter<string>();

  @Output() loadMore = new EventEmitter();

  @Output() deleteMessage = new EventEmitter<IMessage>();

  @Output() editMessage = new EventEmitter<IMessage>();

  @ViewChild('messagesElement', { static: false }) messagesElement!: ElementRef;

  @ViewChild('messagesScrollableContainer', { static: false }) messagesScrollableElement!: ElementRef;

  constructor(
    private clipboard: Clipboard,
    overlayService: OverlayService,
    elementRef: ElementRef,
  ) {
    super(overlayService, elementRef);
    this.component = ModalComponent;
    this.overlayType = 'modal';
    this.hostLister = false;
  }

  ngAfterViewInit(): void {
    this.messagesObserver = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          this.hasMore &&
          !this.isLoading
        ) {
          this.loadMore.emit();
        }
      },
      {
        root: this.messagesScrollableElement.nativeElement,
        rootMargin: '30px'
      }
    );

    this.messagesObserver.observe(
      this.messagesElement.nativeElement
    );
  }

  config?: IDropdownConfig = {
    textSize: '14px',
    textColor: '#636363',
    maxHeight: 'sm',
    width: '100px',
    searchBar: false,
    optionPrefix: false
  }

  editMessageData: IMessage | undefined;

  messageSend() {
    if(this.message && !this.editMessageData) {
      this.sendMessage.emit(this.message);
      this.message = '';
    } else if(this.message && this.editMessageData) {
      this.editMessage.emit({ ...this.editMessageData, content: this.message })
      this.messageEditCancel()
    }
  }

  messageEditCancel () {
    this.message = '';
    this.editMessageData = undefined;
  }

  getMessageOptions (_sender: string) {
    const options = [
      { label: 'Reply', value: 'reply' },
      { label: 'Copy', value: 'copy' },
    ];

    if(_sender === this.myUserId) {
      options.push({ label: 'Edit', value: 'edit' });
      options.push({ label: 'Delete', value: 'delete' })
    }

    return options;
  }

  selectedOption(option: IOption, message: IMessage) {
    switch(option.value) {
      case 'reply':
        break;
      case 'copy':
        this.clipboard.copy(message.content);
        break;
      case 'edit':
        this.scrollToMessage(message._id)
        this.editMessageData = message
        this.message = message.content
        break;
      case 'delete':
        this.openOverlay();
        this.deleteMessageData = message
        break;
      default:
        break;
    }
  }

  modalBtnAction(type: 'positive' | 'negative') {
    if(type === 'positive' && this.deleteMessage) {
      this.deleteMessage.emit(this.deleteMessageData)
    }

    this.closeOverlay(); 
  }

  scrollToMessage(messageId: string) {
    setTimeout(() => {
      const element = document.getElementById(`msg-${messageId}`);
  
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }
    }, 0);
  }

  override injectOutput(): void {
    this.componentRef?.instance.negativeBtnClicked.subscribe(() => this.modalBtnAction('negative'));
    this.componentRef?.instance.positiveBtnClicked.subscribe(() => this.modalBtnAction('positive'));
  }

  override injectInput(): void {
    if(this.componentRef) {
      this.componentRef.instance.modal = this.modal;
    }
  }
}
