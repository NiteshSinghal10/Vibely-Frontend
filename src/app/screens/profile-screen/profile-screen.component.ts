import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectChipsComponent, IMultiSelectChipOptions } from '../../components';
import { CircleAsset, MaleAsset } from '../../assets';
import { FemaleAsset } from '../../assets/female';
import { IUserLocation, LocalStorageService, LocationService } from '../../services';
import { IUser } from '../../interfaces';

@Component({
  selector: 'app-profile-screen',
  imports: [MaleAsset, FemaleAsset, MultiSelectChipsComponent, CircleAsset, CommonModule],
  templateUrl: './profile-screen.component.html'
})
export class ProfileScreenComponent implements OnInit {

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

  constructor(
    private localStorageService: LocalStorageService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.locationService.getUserLocation().subscribe((response) => {
      this.location = response.data;
    })
  }

  selectedInterests: {label: string, value: string}[] = []
  location?: IUserLocation;

  get chips(): IMultiSelectChipOptions[] {
    return this.interests.map(interest => ({
      label: interest,
      value: interest.toLowerCase(),
      bgColor: '#DBEAFE',
      textColor: '#1D4ED8',
      selected: this.selectedInterests.some(selectedInterest => interest.toLowerCase() === selectedInterest.value)
    }))
  }

  get flagLink() {
    return this.location ? `https://flagcdn.com/${this.location.countryCode.toLowerCase()}.svg` : '';
  }

  selectInterest(chip: IMultiSelectChipOptions) {
    this.selectedInterests.push(chip);
  }

  deselectInterest(chip: IMultiSelectChipOptions) {
    this.selectedInterests = this.selectedInterests.filter(selectedInterest => selectedInterest.value !== chip.value);
  }

  get userProfile() {
    const user = this.localStorageService.getItem<IUser>('user');

    return user;
  }

  get userGender() {
    return this.userProfile?.gender ?? 'NA';
  }
}
