import { Directive, ElementRef, Input } from '@angular/core';
import { CommonDirective } from '../common';
import { FriendRequestComponent, IFriendRequest } from '../../components';
import { OverlayService } from '../../services';

@Directive({
  selector: '[appFriendRequest]',
  standalone: true 
})
export class FriendRequestDirective extends CommonDirective<FriendRequestComponent> {

  @Input() friendRequests: IFriendRequest[] = [];

  constructor(
    overlayService: OverlayService,
    elementRef: ElementRef,
  ) {
    super(overlayService, elementRef);
    this.component = FriendRequestComponent;
  }

  override injectInput(): void {
    if(this.componentRef) {
      if(this.friendRequests.length) {
        this.componentRef.instance.friendRequests = this.friendRequests;
      }
    }
  }

  override injectOutput(): void {

    // this.overlayRef?.backdropClick().subscribe(() => this.selectionComplete.emit(true));
  }

}
