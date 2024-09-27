import { Component } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket/websocket.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  messages: string[] = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.onMessage().subscribe((message) => {
      this.messages.push(message);
      console.log('Received message:', message);
    });
  }
}
