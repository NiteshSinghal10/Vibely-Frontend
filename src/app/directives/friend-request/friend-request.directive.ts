import { Directive, ElementRef, Input } from '@angular/core';
import { CommonDirective } from '../common';
import { FriendRequestComponent, IFriendRequest } from '../../components';
import { OverlayService } from '../../services';

@Directive({
  selector: '[appFriendRequest]',
  standalone: true 
})
export class FriendRequestDirective extends CommonDirective<FriendRequestComponent> {

  constructor(
    overlayService: OverlayService,
    elementRef: ElementRef,
  ) {
    super(overlayService, elementRef);
    this.component = FriendRequestComponent;
  }
}
