import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectChipsComponent, IMultiSelectChipOptions } from '../../components';
import { CircleAsset, MaleAsset } from '../../assets';
import { FemaleAsset } from '../../assets/female';
import { IUserInfo, LocalStorageService, LocationService } from '../../services';
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
    this.locationService.getUserInfo().subscribe((response) => {
      this.userInfo = response.data;
      this.selectedInterests = [ ...(this.userInfo?.interests ?? []) ]
    })
  }

  selectedInterests: string[] = []
  userInfo?: IUserInfo;

  get chips(): IMultiSelectChipOptions[] {
    return this.interests.map(interest => ({
      label: interest,
      value: interest.toLowerCase(),
      bgColor: '#FFFFFF',
      textColor: '#757575',
      selected: this.selectedInterests.some(selectedInterest => interest.toLowerCase() === selectedInterest)
    }))
  }

  get isLocationExists() {
    return this.userInfo ? !!(Object.keys(this.userInfo).length) : false;
  }

  get flagLink() {
    return this.userInfo ? `https://flagcdn.com/${this.userInfo.countryCode.toLowerCase()}.svg` : '';
  }

  selectInterest(chip: IMultiSelectChipOptions) {
    this.selectedInterests.push(chip.value);
  }

  deselectInterest(chip: IMultiSelectChipOptions) {
    this.selectedInterests = this.selectedInterests.filter(selectedInterest => selectedInterest !== chip.value);
  }

  get userProfile() {
    const user = this.localStorageService.getItem<IUser>('user');

    return user;
  }

  get userGender() {
    return this.userProfile?.gender ?? 'NA';
  }

  get isInterestsUpdated() {
    const stringifiedInterestValues = JSON.stringify(this.selectedInterests);
    const stringifiedUserInterest = JSON.stringify(this.userInfo?.interests ?? []);

    return !(stringifiedInterestValues === stringifiedUserInterest);
  }

  updateInterests () {
    if(this.userInfo) {
      this.userInfo.interests = this.selectedInterests;
    }

    this.locationService.updateUserInterest(this.selectedInterests ?? []).subscribe();
  }
}
