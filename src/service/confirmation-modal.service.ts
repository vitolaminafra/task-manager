import { Injectable } from '@angular/core';
import HSOverlay from '@preline/overlay';
import { BehaviorSubject } from 'rxjs';

export interface ConfirmationModalData {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  private confirmationModalState = new BehaviorSubject<ConfirmationModalData>({
    title: '',
    message: '',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Confirm',
  });
  confirmationModalState$ = this.confirmationModalState.asObservable();

  private onConfirm: (() => void) | undefined;
  private onCancel: (() => void) | undefined;

  open(
    modalData: ConfirmationModalData,
    onConfirm?: () => void,
    onCancel?: () => void,
  ): void {
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;

    this.confirmationModalState.next(modalData);
    HSOverlay.open('#confirmation-modal');
  }

  confirm(): void {
    if (this.onConfirm) {
      this.onConfirm();
    }
    HSOverlay.close('#confirmation-modal');
  }

  cancel(): void {
    if (this.onCancel) {
      this.onCancel();
    }
    HSOverlay.close('#confirmation-modal');
  }
}
