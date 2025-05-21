import { Component, OnInit } from '@angular/core';
import { Task } from '../../../class/task';
import { PriorityBadgeComponent } from '../../base-element/priority-badge/priority-badge.component';
import { PriorityEnum } from '../../../enum/priority.enum';
import { NgClass, NgIf } from '@angular/common';
import { TaskService } from '../../../service/task.service';
import { MyButtonComponent } from '../../base-element/my-button/my-button.component';
import { ButtonColorEnum } from '../../../enum/button-color.enum';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';

@Component({
  selector: 'app-task-modal',
  imports: [PriorityBadgeComponent, NgIf, NgClass, MyButtonComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent implements OnInit {
  protected readonly PriorityEnum = PriorityEnum;
  protected selectedTask: Task | undefined = undefined;

  protected readonly ButtonColorEnum = ButtonColorEnum;
  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.selectedTask$.subscribe((task) => {
      this.selectedTask = task;
    });
  }

  markAsCompleted() {
    this.taskService.selectedTask$.subscribe((task) => {
      task!.isCompleted = true;
    });
  }
}
