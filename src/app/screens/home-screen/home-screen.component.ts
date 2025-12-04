import { Component, OnInit } from '@angular/core';

import { DropdownDirective } from '../../directives';
import { CountryService } from '../../services/country/country.service';
import { IOption, IDropdownConfig } from '../../components';
import { PlusComponent } from '../../assets';

@Component({
  selector: 'app-home-screen',
  imports: [DropdownDirective, PlusComponent],
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
    searchNotFound: 'No Search Matches'
  }

  ngOnInit(): void {
    this.countryService.allCountries().subscribe(values => {
      this.options = [ ...values.map(value => ({ label: value.name.common, value: '1', imgSrc: value.flags.svg })), { label: 'Any', value: '1', imgSrc: 'earth.png' }]
    })
  }
}
