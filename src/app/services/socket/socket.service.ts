import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor() {
    this.socket = io('ws://localhost:3003', {
      withCredentials: true, // important for cookies
      transports: ['websocket']
    });
  }

  // listen to events
  on<K extends keyof ServerToClientEvents>(event: K): Observable<Parameters<ServerToClientEvents[K]>[0]> {
    return new Observable(observer => {
      (this.socket.on as any)(event, ((...args: Parameters<ServerToClientEvents[K]>) => {
        observer.next(args[0]);
      }));
    });
  }

  // emit events
  emit<K extends keyof ClientToServerEvents>(event: K, ...args: Parameters<ClientToServerEvents[K]>) {
    this.socket.emit(event, ...args);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
