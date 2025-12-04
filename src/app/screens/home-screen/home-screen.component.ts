import { Component, OnInit } from '@angular/core';

import { DropdownDirective } from '../../directives';
import { CountryService } from '../../services/country/country.service';
import { IOption, IDropdownConfig, SelectedChipsComponentComponent, IChip } from '../../components';
import { PlusAsset } from '../../assets';

@Component({
  selector: 'app-home-screen',
  imports: [DropdownDirective, PlusAsset, SelectedChipsComponentComponent],
  templateUrl: './home-screen.component.html'
})
export class HomeScreenComponent implements OnInit {
  constructor(private countryService: CountryService) {  }
  
  options: IOption[] = []
  config: IDropdownConfig = {
    textSize: '14px',
    textColor: '#636363',
    maxHeight: 'sm',
    width: 'sm',
    searchBar: true,
    optionPrefix: true,
    searchPlaceHolder: 'Search',
    searchNotFound: 'No Options',
    multiSelect: true
  }

  ngOnInit(): void {
    this.countryService.allCountries().subscribe(values => {
      this.options = [ { label: 'Any', value: 'any', imgSrc: 'earth.png' }, ...values.map(value => ({ label: value.name.common, value: value.cca3, imgSrc: value.flags.svg }))]
    })
  }

  get chips(): IChip[] {
    return this.options.filter(option => option.selected).map(option => ({ label: option.label, value: option.value, bgColor: '#FF0000'}))
  }

  optionSelected(option: IOption) {
    const optionIndex = this.options.findIndex(inputOption => inputOption.value === option.value);

    if(optionIndex !== -1) {
      this.options[optionIndex].selected = true; 
    }
  }

  optionDeselected(option: IOption) {
    const optionIndex = this.options.findIndex(inputOption => inputOption.value === option.value);

    if(optionIndex !== -1) {
      this.options[optionIndex].selected = false; 
    }
  }
}
