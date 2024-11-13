import { Component, inject, Input } from '@angular/core';
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
  @Input() room: string = '';
  @Input() user: string | null = 'James';
  private websocketService = inject(WebsocketService);

  sendMessage(): void {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.room, this.user!, this.message);
      this.message = ''; // Clear the input after sending
    }
  }
}
