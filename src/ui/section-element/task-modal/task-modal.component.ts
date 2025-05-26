import { Component, OnInit } from '@angular/core';
import { Task } from '../../../class/task';
import { PriorityBadgeComponent } from '../../base-element/priority-badge/priority-badge.component';
import { PriorityEnum } from '../../../enum/priority.enum';
import { NgClass, NgIf } from '@angular/common';
import { TaskService } from '../../../service/task.service';
import { MyButtonComponent } from '../../base-element/my-button/my-button.component';
import { ButtonColorEnum } from '../../../enum/button-color.enum';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';
import { Pencil, Trash2 } from 'lucide-angular';
import HSOverlay from '@preline/overlay';
import { ConfirmationModalService } from '../../../service/confirmation-modal.service';

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

  protected readonly Pencil = Pencil;
  protected readonly Trash2 = Trash2;

  constructor(
    private taskService: TaskService,
    private confirmationModalService: ConfirmationModalService,
  ) {}

  ngOnInit() {
    this.taskService.selectedTask$.subscribe((task) => {
      this.selectedTask = task;
    });
  }

  markAsCompleted() {
    if (this.selectedTask !== undefined) {
      this.taskService.markAsDone(this.selectedTask);
      HSOverlay.close('#task-modal');
    }
  }

  deleteTask() {
    if (this.selectedTask !== undefined) {
      this.confirmationModalService.open(
        {
          title: 'Delete task',
          message: 'Are you sure you want to delete this task?',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        },
        () => {
          this.taskService.deleteTask(this.selectedTask!);
          HSOverlay.close('#task-modal');
        },
      );
    }
  }
}
