import { Component } from '@angular/core';

import { DropdownDirective } from '../../directives';

@Component({
  selector: 'app-navbar',
  imports: [DropdownDirective],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  options = [
    { label: 'Nitesh', value: 'nitesh' },
    { label: 'Single', value: 'singhal' }
  ]
}
