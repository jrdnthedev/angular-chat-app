import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:3000'); // Connect to the server
  }

  // Send message to the server
  sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  // Listen for incoming messages from the server
  onMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('receiveMessage', (message: string) => {
        observer.next(message);
      });
    });
  }
}
