import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './section-element/sidebar/sidebar.component';
import { ContainerComponent } from './section-element/container/container.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  constructor() {} //private taskService: TaskService, //private tabService: TabService,

  ngOnInit() {
    //this.tabService.generateMockTabs();
    //this.taskService.generateMockTasksOne();
  }
}
