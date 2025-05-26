import { Component } from '@angular/core';
import { SidebarComponent } from '../ui/section-element/sidebar/sidebar.component';
import { ContainerComponent } from '../ui/section-element/container/container.component';
import { ToastNotificationComponent } from '../ui/section-element/toast-notification/toast-notification.component';
import { ConfirmationModalComponent } from '../ui/section-element/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    ContainerComponent,
    ToastNotificationComponent,
    ConfirmationModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'task-manager';

  constructor() {}
}
