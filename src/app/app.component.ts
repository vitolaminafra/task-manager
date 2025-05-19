import { Component } from '@angular/core';
import { SidebarComponent } from '../ui/section-element/sidebar/sidebar.component';
import { ContainerComponent } from '../ui/section-element/container/container.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'task-manager';

  constructor() {}
}
