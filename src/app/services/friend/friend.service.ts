import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { IFriend } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private networkService: NetworkService) { }

  getFriends(search: string | null, cursor = '', limit = 10) {
    return this.networkService.get<{ data: IFriend[]}>('/vibely/api/v1/friend/list', { ...(search ? { search } : {}), cursor, limit });
  }
}
