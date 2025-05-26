import { Component, OnInit } from '@angular/core';
import { MyButtonComponent } from '../../base-element/my-button/my-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';
import { ButtonColorEnum } from '../../../enum/button-color.enum';
import {
  ConfirmationModalData,
  ConfirmationModalService,
} from '../../../service/confirmation-modal.service';

@Component({
  selector: 'app-confirmation-modal',
  imports: [MyButtonComponent, ReactiveFormsModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent implements OnInit {
  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;
  protected readonly ButtonColorEnum = ButtonColorEnum;

  protected confirmationModalData: ConfirmationModalData | undefined =
    undefined;

  constructor(private confirmationModalService: ConfirmationModalService) {}

  ngOnInit() {
    this.confirmationModalService.confirmationModalState$.subscribe((state) => {
      this.confirmationModalData = state;
    });
  }

  confirm() {
    this.confirmationModalService.confirm();
  }

  cancel() {
    this.confirmationModalService.cancel();
  }
}
