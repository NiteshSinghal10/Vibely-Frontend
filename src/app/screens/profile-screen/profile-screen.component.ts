import { Component } from '@angular/core';
import { MultiSelectChipsComponent, IMultiSelectChipOptions } from '../../components';
import { MaleAsset } from '../../assets';
import { FemaleAsset } from '../../assets/female';

@Component({
  selector: 'app-profile-screen',
  imports: [MaleAsset, FemaleAsset, MultiSelectChipsComponent],
  templateUrl: './profile-screen.component.html'
})
export class ProfileScreenComponent {

  private interests = [
    "Football",
    "Cricket",
    "Basketball",
    "Travel",
    "Cooking",
    "Music",
    "Photography",
    "Gaming",
    "Reading",
    "Technology",
    "Programming",
    "Movies",
    "Fitness",
    "Health & Wellness",
    "Art & Design",
    "Education",
    "Business",
    "Entrepreneurship",
    "Fashion",
    "Nature",
    "Pets",
    "Cars",
    "Motorcycles",
    "Investing",
    "Science",
    "History",
    "Volunteering",
    "Yoga",
    "Dancing",
    "Social Media",
    "Podcasts"
  ];

  selectedInterests: {label: string, value: string}[] = []

  get chips(): IMultiSelectChipOptions[] {
    return this.interests.map(interest => ({
      label: interest,
      value: interest.toLowerCase(),
      bgColor: '#DBEAFE',
      textColor: '#1D4ED8',
      selected: this.selectedInterests.some(selectedInterest => interest.toLowerCase() === selectedInterest.value)
    }))
  }

  selectInterest(chip: IMultiSelectChipOptions) {
    this.selectedInterests.push(chip);
  }

  deselectInterest(chip: IMultiSelectChipOptions) {
    this.selectedInterests = this.selectedInterests.filter(selectedInterest => selectedInterest.value !== chip.value);
  }
}
