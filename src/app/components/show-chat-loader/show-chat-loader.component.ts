import { Component, Input } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader';

@Component({
  selector: 'app-show-chat-loader',
  imports: [SkeletonLoaderComponent],
  templateUrl: './show-chat-loader.component.html'
})
export class ShowChatLoaderComponent {
  @Input() count = 3;

  get arrayCount() {
    return Array.from({ length: this.count });
  }
}
