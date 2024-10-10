import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements AfterViewInit {
  title = 'Modal';
  @ViewChild('dialog') modal!: ElementRef<HTMLDialogElement>;
  @Input() message = 'This is a modal';

  ngAfterViewInit() {
    this.modal.nativeElement.showModal();
  }

  close(): void {
    this.modal.nativeElement.close();
  }
}
