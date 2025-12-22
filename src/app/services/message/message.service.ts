import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { IMessage } from '../../components';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private networkService: NetworkService) { }

  getMessages(_user: string, page = 1, limit = 30) {
    return this.networkService.get<{ data: IMessage[] }>('/vibely/api/v1/message/list', { _user, page, limit })
  }
}
