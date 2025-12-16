import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { IFriendRequest } from './friend-requests.types';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsService {

  constructor(private networkService: NetworkService) { }


  getFriends(search: string | null, page = 1, limit = 10) {
    return this.networkService.get<{ data: IFriendRequest[]}>('/vibely/api/v1/friend/list', { ...(search ? { search } : {}), page, limit });
  }
}
