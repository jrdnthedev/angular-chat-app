import { Component } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket/websocket.service';
import { ChatComponent } from '../chat/chat.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ChatComponent, MessageInputComponent],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  chatData: { user: string; message: string; timestamp: Date }[] = [];
  message = '';
  activeRoom = '';
  subscription: SubscriptionLike[] = [];
  user = 'James';

  constructor(
    private websocketService: WebsocketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Chat room component');
    this.subscription.push(
      this.route.params.subscribe((params) => {
        console.log('Room ID', params['roomId']);
        this.activeRoom = params['roomId'];
      })
    );
    this.retrievePreviousMessages();
    this.onNewMessage();
  }

  retrievePreviousMessages(): void {
    this.subscription.push(
      this.websocketService.onPreviousMessages().subscribe((message) => {
        console.log('Previous messages', message);
        this.chatData = message;
      })
    );
  }

  onNewMessage(): void {
    this.subscription.push(
      this.websocketService.onMessage().subscribe((message) => {
        this.chatData.push(message);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
