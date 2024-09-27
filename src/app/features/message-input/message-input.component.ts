import { Component } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket/websocket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  message: string = '';

  constructor(private websocketService: WebsocketService) {}

  sendMessage(): void {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message);
      this.message = ''; // Clear the input after sending
    }
  }
}
