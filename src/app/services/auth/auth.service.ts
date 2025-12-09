import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private networkService: NetworkService,
    private localStorageService: LocalStorageService
  ) { }

  async validateToken() {
    const payload = await firstValueFrom(this.networkService.get<{data: {}}>('/auth/api/v1/auth/my-profile'));
    this.localStorageService.setItem('user', payload.data)
  }
}
