import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownDirective } from '../../directives';
import { IDropdownConfig, IOption } from '../dropdown';

@Component({
  selector: 'app-navbar',
  imports: [DropdownDirective],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private router: Router) {}

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
    this.router.navigate([`/${option.value}`]);
  }


}
