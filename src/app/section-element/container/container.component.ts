import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../class/task';
import HSOverlay from '@preline/overlay';
import { NgForOf } from '@angular/common';
import { TabService } from '../../../service/tab.service';
import { TaskService } from '../../../service/task.service';
import { Tab } from '../../class/tab';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-container',
  imports: [
    TaskCardComponent,
    TaskModalComponent,
    NgForOf,
    LucideAngularModule,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent implements OnInit {
  tasks: Task[] = [];
  selectedTab: Tab | undefined = undefined;

  constructor(
    private tabService: TabService,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.tabService.currentTab$.subscribe((tab) => {
      this.selectedTab = tab;
      console.log(tab);
      this.tasks = [];
      if (tab != undefined) {
        tab.isCompleted
          ? this.taskService.generateMockTasksOne()
          : this.taskService.generateMockTasksTwo();
      }
    });

    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  openTaskModal() {
    HSOverlay.open('#task-modal');
  }
}
