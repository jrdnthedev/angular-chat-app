import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @Input() message = '';

  ngOnInit(): void {
    console.log('Chat component initialized', this.message);
  }
}
