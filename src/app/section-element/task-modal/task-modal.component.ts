import { Component, Input } from '@angular/core';
import { Task } from '../../class/task';
import { PriorityBadgeComponent } from '../../base-element/priority-badge/priority-badge.component';
import { PriorityEnum } from '../../model/priority.enum';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-modal',
  imports: [PriorityBadgeComponent, NgIf, NgClass],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent {
  @Input() task: Task | null = new Task(
    0,
    '',
    '',
    '',
    PriorityEnum.LOW,
    false,
    false,
  );
  protected readonly PriorityEnum = PriorityEnum;
}
