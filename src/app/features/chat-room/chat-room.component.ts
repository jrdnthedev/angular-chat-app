import { Component } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket/websocket.service';
import { ChatComponent } from '../chat/chat.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Location } from '@angular/common';

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
  roomTitle = 'Chat Room';

  constructor(
    private websocketService: WebsocketService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log('Chat room component');
    this.subscription.push(
      this.route.params.subscribe((params) => {
        this.roomTitle = params['roomId'];
        this.activeRoom = params['roomId'];
      })
    );
    this.retrievePreviousMessages();
    this.onNewMessage();
  }

  back(): void {
    this.location.back();
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
