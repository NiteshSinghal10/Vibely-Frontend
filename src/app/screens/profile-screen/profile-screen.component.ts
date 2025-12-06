import { Component } from '@angular/core';
import { IChip, SelectedChipsComponentComponent } from '../../components';
import { MaleAsset } from '../../assets';
import { FemaleAsset } from '../../assets/female';

@Component({
  selector: 'app-profile-screen',
  imports: [SelectedChipsComponentComponent, MaleAsset, FemaleAsset],
  templateUrl: './profile-screen.component.html'
})
export class ProfileScreenComponent {
  get chips(): IChip[] {
    return []
  }
}
