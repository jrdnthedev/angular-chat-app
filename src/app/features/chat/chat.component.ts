import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Sender } from '../../types/types';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @Input() chat!: Sender;
  @Input() isLoggedInUser!: string;
  ngOnInit(): void {}
}
