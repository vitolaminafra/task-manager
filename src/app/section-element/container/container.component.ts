import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../class/task';
import HSOverlay from '@preline/overlay';
import { NgForOf } from '@angular/common';
import { TabService } from '../../../service/tab.service';
import { TaskService } from '../../../service/task.service';
import { Tab } from '../../class/tab';

@Component({
  selector: 'app-container',
  imports: [TaskCardComponent, TaskModalComponent, NgForOf],
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
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.tabService.currentTab$.subscribe((tab) => {
      this.selectedTab = tab;
      this.tasks = [];
      tab!.id % 2 == 0
        ? this.taskService.generateMockTasksOne()
        : this.taskService.generateMockTasksTwo();
    });
  }

  openTaskModal() {
    HSOverlay.open('#task-modal');
  }
}
