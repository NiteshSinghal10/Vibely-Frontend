import { Component, OnInit } from '@angular/core';

import { DropdownDirective } from '../../directives';
import { CountryService } from '../../services/country/country.service';
import { IOption } from '../../components';

@Component({
  selector: 'app-home-screen',
  imports: [DropdownDirective],
  templateUrl: './home-screen.component.html'
})
export class HomeScreenComponent implements OnInit {
  constructor(private countryService: CountryService) {  }
  
  options: IOption[] = []

  ngOnInit(): void {
    this.countryService.allCountries().subscribe(values => {
      this.options = values.map(value => ({ label: value.name.common, value: '1' }))
    })
  }
}
