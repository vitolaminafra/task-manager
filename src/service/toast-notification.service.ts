import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastNotificationEnum } from '../enum/toast-notification.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  private toastState = new BehaviorSubject<{
    isVisible: boolean;
    severity: ToastNotificationEnum;
    message: string;
  }>({
    isVisible: false,
    severity: ToastNotificationEnum.INFO,
    message: '',
  });

  toastState$ = this.toastState.asObservable();

  showNotification(
    severity: ToastNotificationEnum,
    message: string,
    duration: number = 3000,
  ) {
    this.toastState.next({
      isVisible: true,
      severity,
      message,
    });

    this.hideAfterDuration(duration);
  }

  private hideAfterDuration(duration: number) {
    setTimeout(() => {
      this.hideNotification();
    }, duration);
  }

  private hideNotification() {
    this.toastState.next({
      isVisible: false,
      severity: ToastNotificationEnum.INFO,
      message: '',
    });
  }
}
