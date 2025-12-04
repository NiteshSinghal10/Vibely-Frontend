import { Component, Input, OnInit } from '@angular/core';
import { ChipComponent, IChip, IChipConfig } from '../chip';
import { TailwindColorPipe } from '../../pipes';

@Component({
  selector: 'app-selected-chips-component',
  imports: [ChipComponent],
  templateUrl: './selected-chips-component.component.html',
  providers: [TailwindColorPipe]
})
export class SelectedChipsComponentComponent implements OnInit {
  @Input() maxHeight = '300px';
  @Input() minHeight = '200px';
  @Input() width = '300px';
  @Input() chips: IChip[] = [
    { label: 'Chip 1', value: 'chip-1', bgColor: '#FF0000' },
    { label: 'Chip 2', value: 'chip-2', bgColor: '#FF0000' },
    { label: 'Chip 3', value: 'chip-3', bgColor: '#FF0000' },
    { label: 'Chip 4', value: 'chip-4', bgColor: '#FF0000' },
  ];
  @Input() chipConfig: IChipConfig = {
    textColor: '',
    textSize: '14px',
    maxWidth: `calc(${this.width} - 90px)`,
    crossIcon: {
      show: true,
      width: '20',
      height: '20'
    }
  };

  constructor(private tailwindColorPipe: TailwindColorPipe) {}

  ngOnInit(): void {
    this.chipConfig.textColor = this.tailwindColorPipe.transform('--color-gray');
  }

  
}
