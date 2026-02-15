import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { IUser } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsService {

  constructor(private networkService: NetworkService) { }

  getFriendRequests(page: number, limit: number) {
    return this.networkService.get<{ data: { _id: string, from: IUser }[]}>('/vibely/api/v1/friend-request', { page, limit });
  }

  countFriendRequests() {
    return this.networkService.get<{ data: number}>('/vibely/api/v1/friend-request/count');
  }

  updateFriendRequest(id: string, status: "ACCEPTED" | "REJECTED") {
    return this.networkService.put<{ data: { _id: string, from: IUser }[]}>('/vibely/api/v1/friend-request', { _id: id, status });
  }

}
