import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  imports: [CommonModule],
  templateUrl: './skeleton-loader.component.html'
})
export class SkeletonLoaderComponent {
  @Input() class: string = 'w-[600px] h-[300px]';

  @Input() bgColor = 'bg-gray-300';

  @Input() rounded = 'rounded-2xl';

  @Input() animationDuration = '1.25s';
}
