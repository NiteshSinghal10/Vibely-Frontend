import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IModal } from './modal.types';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() width = '400px';

  @Input() height = '200px';

  @Input() modal: IModal = {
    title: 'Confirm Logout',
    subtitle: 'You’ll need to sign in again to access your account.',
    positiveBtnText: 'Logout',
    negativeBtnText: 'Cancel'
  }

  @Output() negativeBtnClicked = new EventEmitter();

  @Output() positiveBtnClicked = new EventEmitter();

  buttonClicked(type: 'positive' | 'negative') {
    switch(type) {
      case 'positive':
        this.positiveBtnClicked.emit();
        break;
      case 'negative':
        this.negativeBtnClicked.emit();
        break;
      default:
        break;
    }
  }
}
