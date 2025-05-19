import { PriorityEnum } from '../model/priority.enum';
import { Utilities } from '../../utility/utlities.js';

export class Task {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priority: PriorityEnum;
  hasAttachment: boolean;
  isCompleted: boolean;

  constructor(
    title: string,
    subtitle: string,
    description: string,
    priority: PriorityEnum = PriorityEnum.LOW,
    hasAttachment: boolean = false,
    isCompleted: boolean = false,
  ) {
    this.id = Utilities.generateId();
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.priority = priority;
    this.hasAttachment = hasAttachment;
    this.isCompleted = isCompleted;
  }
}
