import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { IFriendRequest } from './friend-requests.types';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsService {

  constructor(private networkService: NetworkService) { }

}
