import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../class/task';
import { PriorityEnum } from '../../model/priority.enum';
import HSOverlay from '@preline/overlay';
import { NgForOf } from '@angular/common';
import { TabService } from '../../../service/tab.service';

@Component({
  selector: 'app-container',
  imports: [TaskCardComponent, TaskModalComponent, NgForOf],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent implements OnInit {
  selectedTask: Task | null = null;

  tasks: Task[] = [];

  tasksFirstTab: Task[] = [
    new Task(
      1,
      'Update user interface',
      'Design > UI/UX > Implementation',
      'Implement new design system across the platform',
      PriorityEnum.HIGH,
      false,
      true,
    ),
    new Task(
      2,
      'Fix database connection',
      'Backend > Database',
      'Resolve intermittent connection issues in production',
      PriorityEnum.HIGH,
      true,
      false,
    ),
    new Task(
      3,
      'Optimize image loading',
      'Frontend > Performance',
      'Implement lazy loading for better performance',
      PriorityEnum.MEDIUM,
      true,
      true,
    ),
    new Task(
      4,
      'Add user analytics',
      'Analytics > Implementation',
      'Integrate Google Analytics for user tracking',
      PriorityEnum.MEDIUM,
      false,
      true,
    ),
    new Task(
      5,
      'Update documentation',
      'Documentation > API',
      'Review and update API documentation',
      PriorityEnum.LOW,
      false,
      false,
    ),
    new Task(
      6,
      'Security audit',
      'Security > Auth',
      'Perform security review of authentication system',
      PriorityEnum.HIGH,
      true,
      false,
    ),
    new Task(
      7,
      'Bug fixes',
      'Maintenance > Bugs',
      'Address reported issues in the feedback module',
      PriorityEnum.LOW,
      true,
      false,
    ),
  ];

  tasksNewTab: Task[] = [
    new Task(
      1,
      'Update user interface',
      'Design > UI/UX > Implementation',
      'Implement new design system across the platform',
      PriorityEnum.HIGH,
      false,
      true,
    ),
    new Task(
      2,
      'Fix database connection',
      'Backend > Database',
      'Resolve intermittent connection issues in production',
      PriorityEnum.HIGH,
      true,
      false,
    ),
  ];

  constructor(private tabService: TabService) {}

  ngOnInit() {
    this.tasks = this.tasksFirstTab;
    this.tabService.currentTab$.subscribe((tab) => {
      this.tasks = [];
      this.tasks = tab!.id % 2 == 0 ? this.tasksNewTab : this.tasksFirstTab;
      console.log(tab);
    });
  }

  openTaskModal(task: Task) {
    console.log(task);
    this.selectedTask = task;
    HSOverlay.open('#task-modal');
  }
}
