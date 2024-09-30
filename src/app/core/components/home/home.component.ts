import { Component } from '@angular/core';
import { RoomSelectionComponent } from '../room-selection/room-selection.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RoomSelectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'My Chat App';
}
