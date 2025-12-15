import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { IUserInfo } from './location.types';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private networkService: NetworkService) { }

  getUserInfo() {
    return this.networkService.get<{ data: IUserInfo }>('/vibely/api/v1/user-info');
  }

  updateUserInterest(interests: string[]) {
    return this.networkService.put<{ data: IUserInfo }>('/vibely/api/v1/user-info/interests', { interests })
  }

}
