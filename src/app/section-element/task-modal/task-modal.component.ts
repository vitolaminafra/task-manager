import { Component, OnInit } from '@angular/core';
import { Task } from '../../class/task';
import { PriorityBadgeComponent } from '../../base-element/priority-badge/priority-badge.component';
import { PriorityEnum } from '../../model/priority.enum';
import { NgClass, NgIf } from '@angular/common';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-modal',
  imports: [PriorityBadgeComponent, NgIf, NgClass],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent implements OnInit {
  protected readonly PriorityEnum = PriorityEnum;
  protected selectedTask: Task | undefined = undefined;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.selectedTask$.subscribe((task) => {
      this.selectedTask = task;
      console.log(task);
    });
  }

  markAsCompleted() {
    this.taskService.selectedTask$.subscribe((task) => {
      task!.isCompleted = true;
    });
  }
}
