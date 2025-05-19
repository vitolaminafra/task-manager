import { PriorityEnum } from '../enum/priority.enum';
import { Utilities } from '../utility/utlities.js';

export class Task {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priority: PriorityEnum;
  attachment: string;
  isCompleted: boolean;

  constructor(
    title: string,
    subtitle: string,
    description: string,
    priority: PriorityEnum = PriorityEnum.LOW,
    attachment: string,
    isCompleted: boolean = false,
  ) {
    this.id = Utilities.generateId();
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.priority = priority;
    this.attachment = attachment;
    this.isCompleted = isCompleted;
  }
}
