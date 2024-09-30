import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @Input() chat!: Chat;

  ngOnInit(): void {
    console.log('Chat component initialized', this.chat);
  }
}

type Chat = { user: string; message: string; timestamp: Date };
