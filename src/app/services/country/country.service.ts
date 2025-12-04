import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';
import { IParams } from '../network/network.types';
import { ICountries } from './country.types';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private domain = 'https://restcountries.com';

  constructor(private networkService: NetworkService) { }

  allCountries(params: IParams = { fields: 'name,flags,cca3' }) {
    return this.networkService.get<Array<ICountries>>('/v3.1/all', params, this.domain);
  }
}
