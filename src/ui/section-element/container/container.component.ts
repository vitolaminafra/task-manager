import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../../class/task';
import HSOverlay from '@preline/overlay';
import { NgForOf, NgIf } from '@angular/common';
import { TabService } from '../../../service/tab.service';
import { TaskService } from '../../../service/task.service';
import { Tab } from '../../../class/tab';
import { BadgePlus, LucideAngularModule } from 'lucide-angular';
import { MyButtonComponent } from '../../base-element/my-button/my-button.component';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { ThemeService } from '../../../service/theme.service';

@Component({
  selector: 'app-container',
  imports: [
    TaskCardComponent,
    TaskModalComponent,
    NgForOf,
    LucideAngularModule,
    MyButtonComponent,
    AddTaskModalComponent,
    NgIf,
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
    protected themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.tabService.currentTab$.subscribe((tab) => {
      this.selectedTab = tab;
      this.tasks = [];
    });

    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  openTaskModal() {
    HSOverlay.open('#task-modal');
  }

  addTask() {
    HSOverlay.open('#add-task-modal');
  }

  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;
}
