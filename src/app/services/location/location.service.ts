import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { IUserLocation } from './location.types';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private networkService: NetworkService) { }

  getUserLocation() {
    return this.networkService.get<{ data: IUserLocation }>('/vibely/api/v1/location/');
  }

}
