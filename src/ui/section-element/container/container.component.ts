import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../../class/task';
import HSOverlay from '@preline/overlay';
import { NgForOf } from '@angular/common';
import { TabService } from '../../../service/tab.service';
import { TaskService } from '../../../service/task.service';
import { Tab } from '../../../class/tab';
import { BadgePlus, LucideAngularModule } from 'lucide-angular';
import { MyButtonComponent } from '../../base-element/my-button/my-button.component';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';

@Component({
  selector: 'app-container',
  imports: [
    TaskCardComponent,
    TaskModalComponent,
    NgForOf,
    LucideAngularModule,
    MyButtonComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent implements OnInit {
  tasks: Task[] = [];
  selectedTab: Tab | undefined = undefined;

  protected readonly AddTaskIcon = BadgePlus;

  constructor(
    private tabService: TabService,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.tabService.currentTab$.subscribe((tab) => {
      this.selectedTab = tab;
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

  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;
}
