import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDirective, DropdownDirective } from '../../directives';
import { IDropdownConfig, IOption } from '../dropdown';
import { LocalStorageService, OverlayService } from '../../services';
import { IUser } from '../../interfaces';
import { ModalComponent } from '../modal';

@Component({
  selector: 'app-navbar',
  imports: [DropdownDirective],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent extends CommonDirective<ModalComponent> {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
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
    { label: 'Subscription', value: 'subscription', imgSrc: 'chat.svg' },
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

  get userProfile() {
    const user = this.localStorageService.getItem<IUser>('user');
    return user;
  }

  get profileImage() {
    return this.userProfile ? this.userProfile.picture : 'profile.svg';
  }

}
