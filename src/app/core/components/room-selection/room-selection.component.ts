import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-selection',
  standalone: true,
  imports: [],
  templateUrl: './room-selection.component.html',
  styleUrl: './room-selection.component.scss',
})
export class RoomSelectionComponent {
  rooms: string[] = ['room1', 'room2', 'room3'];
  newRoomName = '';

  constructor(
    private websocketService: WebsocketService,
    private router: Router,
    private http: HttpClient
  ) {}

  loadRooms() {
    this.http
      .get<{ rooms: string[] }>('http://localhost:3000/rooms')
      .subscribe((response) => {
        this.rooms = response.rooms;
      });
  }

  createRoom() {
    if (this.newRoomName.trim() === '') {
      return;
    }

    this.http
      .post('http://localhost:3000/createRoom', { roomName: this.newRoomName })
      .subscribe(
        () => {
          this.rooms.push(this.newRoomName);
          this.newRoomName = ''; // Reset input field
        },
        (error) => {
          console.error('Error creating room:', error);
        }
      );
  }

  joinRoom(room: string) {
    this.websocketService.joinRoom(room);
    // Redirect to chat component or update the room UI
    this.router.navigate(['/chat']);
  }
}
