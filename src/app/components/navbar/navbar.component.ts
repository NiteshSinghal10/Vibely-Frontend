import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDirective, DropdownDirective } from '../../directives';
import { IDropdownConfig, IOption } from '../dropdown';
import { FriendRequestsService, LocalStorageService, OverlayService } from '../../services';
import { IUser } from '../../interfaces';
import { ModalComponent } from '../modal';
import { AuthService } from '../../services';
import { environment } from '../../../environments/environment';
import { FriendRequestDirective } from '../../directives/friend-request/friend-request.directive';

@Component({
  selector: 'app-navbar',
  imports: [DropdownDirective, FriendRequestDirective],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent extends CommonDirective<ModalComponent> implements OnInit {
  friendRequestsCount = 0;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private friendRequestsService: FriendRequestsService,
    overlayService: OverlayService,
    elementRef: ElementRef,
  ) {
    super(overlayService, elementRef);
    this.component = ModalComponent;
    this.overlayType = 'modal';
    this.hostLister = false;
  }

  options: IOption[] = [
    { label: 'Profile', value: 'profile', imgSrc: 'profile-2.svg' },
    { label: 'Chats', value: 'chats', imgSrc: 'chat.svg' },
    { label: 'Subscription', value: 'subscription', imgSrc: 'subscription.svg' },
    { label: 'Settings', value: 'settings', imgSrc: 'setting.svg' },
    { label: 'Logout', value: 'logout', imgSrc: 'logout.svg', textColor: '#c11a1a' }
  ]
  config: IDropdownConfig = {
    textSize: '16px',
    textColor: '#636363',
    maxHeight: 'sm',
    width: '400px',
    searchBar: false,
    optionPrefix: true,
    searchPlaceHolder: 'Search',
    searchNotFound: 'No Options',
    multiSelect: false
  }

  selectedOption(option: IOption) {
    if(option.value === 'logout') {
      this.openOverlay();
    } else {
      this.router.navigate([`/${option.value}`]);
    }
  }

  ngOnInit(): void {
    this.getFriendRequestsCount();
  }

  get userProfile() {
    const user = this.localStorageService.getItem<IUser>('user');
    return user;
  }

  get profileImage() {
    return this.userProfile ? this.userProfile.picture : 'profile.svg';
  }

  getFriendRequestsCount() {
    this.friendRequestsService.countFriendRequests().subscribe(res => {
      this.friendRequestsCount = res.data;
    })
  }

  override injectOutput(): void {
    this.componentRef?.instance.negativeBtnClicked.subscribe(() => this.logoutModalButtonClick('negative'));
    this.componentRef?.instance.positiveBtnClicked.subscribe(() => this.logoutModalButtonClick('positive'));
  }

  logoutModalButtonClick(type: 'positive' | 'negative') {
    switch(type) {
      case 'positive':
        this.authService.logout().subscribe(()=> {
          this.closeOverlay();
          window.location.href =
              `${environment.authServiceUrl}?redirectUrl=${environment.frontendBaseUrl}&aud=${environment.frontendBaseUrl}`;
        })
        break;
      case 'negative':
        this.closeOverlay()
        break;
      default:
        break;
    }
  }

  navigateToHomeScreen() {
    this.router.navigate(['/']);
  }
}
