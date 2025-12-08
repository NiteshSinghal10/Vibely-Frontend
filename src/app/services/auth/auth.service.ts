import { Injectable } from '@angular/core';
import { NetworkService } from '../network';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private networkService: NetworkService) { }

  async validateToken() {
    return await firstValueFrom(this.networkService.get('/auth/api/v1/auth/validate-token'));
  }
}
