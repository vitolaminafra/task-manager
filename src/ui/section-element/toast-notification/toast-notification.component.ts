import { Component, Input } from '@angular/core';
import { ToastNotificationEnum } from '../../../enum/toast-notification.enum';
import { NgIf } from '@angular/common';
import { ToastNotificationService } from '../../../service/toast-notification.service';

@Component({
  selector: 'app-toast-notification',
  imports: [NgIf],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css',
})
export class ToastNotificationComponent {
  @Input() isVisible: boolean = false;
  @Input() severity: ToastNotificationEnum = ToastNotificationEnum.INFO;
  @Input() message: string = '';
  protected readonly ToastNotificationEnum = ToastNotificationEnum;

  protected toastState = { isVisible: false, severity: '', message: '' };

  constructor(private toastNotificationService: ToastNotificationService) {
    this.toastNotificationService.toastState$.subscribe(
      (toastState) => (this.toastState = toastState),
    );
  }
}
