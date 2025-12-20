import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { IUser } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private networkService: NetworkService) { }

  getFriends(search: string | null, page = 1, limit = 10) {
    return this.networkService.get<{ data: IUser[]}>('/vibely/api/v1/friend/list', { ...(search ? { search } : {}), page, limit });
  }
}
