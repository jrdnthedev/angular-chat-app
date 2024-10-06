import { Component } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket/websocket.service';
import { ChatComponent } from '../chat/chat.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { StoreService } from '../../core/services/store/store.service';
import { Sender } from '../../types/types';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ChatComponent, MessageInputComponent, CommonModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  chatData: Sender[] = [];
  message = '';
  subscription: SubscriptionLike[] = [];
  user = 'User';
  roomTitle = 'Chat Room';
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private websocketService: WebsocketService,
    private route: ActivatedRoute,
    private location: Location,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.route.params.subscribe((params) => {
        this.roomTitle = params['roomId'];
      })
    );
    this.subscription.push(
      this.store.username.subscribe((username) => {
        this.user = username;
      })
    );
    this.retrievePreviousMessages();
    this.onNewMessage();
    this.isLoggedIn$ = this.store.isLoggedIn$;
  }

  back(): void {
    this.location.back();
  }

  retrievePreviousMessages(): void {
    this.subscription.push(
      this.websocketService.onPreviousMessages().subscribe((message) => {
        this.chatData = message;
        console.log(this.chatData);
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
