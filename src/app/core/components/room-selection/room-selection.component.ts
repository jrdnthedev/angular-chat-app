import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { StoreService } from '../../services/store/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-selection',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './room-selection.component.html',
  styleUrl: './room-selection.component.scss',
})
export class RoomSelectionComponent {
  rooms!: {};
  newRoomName = '';
  subscriptions: SubscriptionLike[] = [];
  isLoggedIn$;

  constructor(
    private websocketService: WebsocketService,
    private router: Router,
    private http: HttpClient,
    private store: StoreService
  ) {
    this.isLoggedIn$ = this.store.isLoggedIn$;
  }

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.subscriptions.push(
      this.http
        .get<{ chatRooms: string[] }>('http://localhost:3000/rooms')
        .subscribe((response) => {
          this.rooms = response.chatRooms;
        })
    );
  }

  objectKeys(obj: any): string[] {
    if (obj && typeof obj === 'object') {
      return Object.keys(obj);
    } else {
      return []; // Return an empty array if obj is null, undefined, or not an object
    }
  }

  createRoom() {
    if (this.newRoomName.trim() === '') {
      return;
    }
    this.subscriptions.push(
      this.http
        .post('http://localhost:3000/createRoom', {
          roomName: this.newRoomName,
        })
        .subscribe({
          next: () => {
            this.rooms = {
              ...this.rooms,
              [this.newRoomName]: this.newRoomName,
            };
            this.newRoomName = ''; // Reset input field
          },
          error: (error) => {
            console.error('Error creating room:', error);
          },
          complete: () => {
            console.log('Room creation process complete');
          },
        })
    );
  }

  joinRoom(room: string) {
    this.websocketService.joinRoom(room);
    // Redirect to chat component or update the room UI
    this.router.navigate(['/chat-room', room]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
