import { Component } from '@angular/core';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatRoomComponent, MessageInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {}
