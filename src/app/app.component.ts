import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './section-element/sidebar/sidebar.component';
import { ContainerComponent } from './section-element/container/container.component';
import { TabService } from '../service/tab.service';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  constructor(
    private tabService: TabService,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.tabService.generateMockTabs();

    this.taskService.generateMockTasksOne();

    console.log(this.tabService.tabs$);
  }
}
