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

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  // Send message to the server
  sendMessage(room: string, user: string, message: string): void {
    this.socket.emit('sendMessage', { room, user, message });
  }

  onMessage(): Observable<{ user: string; message: string; timestamp: Date }> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (data) => {
        observer.next(data);
      });
    });
  }

  // Retrieve previous messages from the room
  onPreviousMessages(): Observable<
    { user: string; message: string; timestamp: Date }[]
  > {
    return new Observable((observer) => {
      this.socket.on('previousMessage', (messages) => {
        observer.next(messages);
      });
    });
  }
}
