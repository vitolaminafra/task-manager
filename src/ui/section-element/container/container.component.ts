import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../../class/task';
import HSOverlay from '@preline/overlay';
import { NgForOf, NgIf } from '@angular/common';
import { TabService } from '../../../service/tab.service';
import { TaskService } from '../../../service/task.service';
import { Tab } from '../../../class/tab';
import {
  BadgePlus,
  LucideAngularModule,
  Square,
  SquareCheckBig,
} from 'lucide-angular';
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
  @ViewChild('addTaskModal') addTaskModal: AddTaskModalComponent | undefined =
    undefined;

  tasks: Task[] = [];
  selectedTab: Tab | undefined = undefined;

  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;

  protected readonly AddTaskIcon = BadgePlus;
  protected readonly NotSelectedIcon = Square;
  protected readonly SelectedIcon = SquareCheckBig;

  protected showPlaceholderImage: boolean = false;

  constructor(
    private tabService: TabService,
    private taskService: TaskService,
    protected themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.tabService.currentTab$.subscribe((tab) => {
      this.selectedTab = tab;
    });

    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.showPlaceholderImage = true;
    });
  }

  openTaskModal() {
    HSOverlay.open('#task-modal');
  }

  openAddTaskModal() {
    HSOverlay.open('#add-task-modal');
    HSOverlay.on('close', '#add-task-modal', () => {
      if (this.addTaskModal) {
        this.addTaskModal.resetForm();
      }
    });
  }

  orderByPriority() {
    if (this.selectedTab !== undefined) {
      this.selectedTab.isOrderByPriority = !this.selectedTab.isOrderByPriority;
      this.taskService.orderByPriority(this.selectedTab?.isOrderByPriority);
    }
  }
}
