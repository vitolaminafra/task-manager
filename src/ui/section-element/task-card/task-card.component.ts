import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriorityBadgeComponent } from '../../base-element/priority-badge/priority-badge.component';
import { PriorityEnum } from '../../../enum/priority.enum';
import { Task } from '../../../class/task';
import { NgClass, NgIf } from '@angular/common';
import { TaskService } from '../../../service/task.service';
import { MyButtonComponent } from '../../base-element/my-button/my-button.component';
import { ButtonColorEnum } from '../../../enum/button-color.enum';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';
import { TruncatePipe } from '../../../pipe/truncate.pipe';

@Component({
  selector: 'app-task-card',
  imports: [
    PriorityBadgeComponent,
    NgIf,
    NgClass,
    MyButtonComponent,
    TruncatePipe,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task: Task | undefined = undefined;
  @Output() openTaskModalEmitter: EventEmitter<Task> = new EventEmitter<Task>();

  protected readonly PriorityEnum = PriorityEnum;

  constructor(private taskService: TaskService) {}

  public openTaskModal() {
    this.taskService.setSelectedTask(this.task);
    this.openTaskModalEmitter.emit(this.task!);
  }

  markAsCompleted() {
    this.task!.isCompleted = true;
  }

  protected readonly ButtonColorEnum = ButtonColorEnum;
  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;
}
