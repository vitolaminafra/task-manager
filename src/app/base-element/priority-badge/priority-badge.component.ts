import { Component, Input } from '@angular/core';
import { PriorityEnum } from '../../model/priority.enum';
import {
  CircleCheckBig,
  LucideAngularModule,
  Rabbit,
  Snail,
  TriangleAlert,
} from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-priority-badge',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './priority-badge.component.html',
  styleUrl: './priority-badge.component.css',
})
export class PriorityBadgeComponent {
  @Input() priority: PriorityEnum = PriorityEnum.LOW;
  protected readonly HighPriorityIcon = TriangleAlert;
  protected readonly LowPriorityIcon = Snail;
  protected readonly MediumPriorityIcon = Rabbit;
  protected readonly DoneIcon = CircleCheckBig;

  protected get icon() {
    switch (this.priority) {
      case PriorityEnum.HIGH:
        return this.HighPriorityIcon;
      case PriorityEnum.MEDIUM:
        return this.MediumPriorityIcon;
      case PriorityEnum.LOW:
        return this.LowPriorityIcon;
      case PriorityEnum.DONE:
        return this.DoneIcon;
      default:
        return this.DoneIcon;
    }
  }

  protected get color() {
    switch (this.priority) {
      case PriorityEnum.HIGH:
        return 'bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500';
      case PriorityEnum.MEDIUM:
        return 'bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500';
      case PriorityEnum.LOW:
        return 'bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500';
      case PriorityEnum.DONE:
        return 'bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500';
      default:
        return 'bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500';
    }
  }
}
