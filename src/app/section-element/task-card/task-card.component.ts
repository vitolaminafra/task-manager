import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriorityBadgeComponent } from '../../base-element/priority-badge/priority-badge.component';
import { PriorityEnum } from '../../model/priority.enum';
import { Task } from '../../class/task';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [PriorityBadgeComponent, NgIf, NgClass],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task: Task | null = null;
  @Output() openTaskModalEmitter: EventEmitter<Task> = new EventEmitter<Task>();

  protected readonly PriorityEnum = PriorityEnum;

  public openTaskModal() {
    this.openTaskModalEmitter.emit(this.task!);
  }
}
