import { PriorityEnum } from '../model/priority.enum';

export class Task {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  priority: PriorityEnum;
  hasAttachment: boolean;
  isCompleted: boolean;

  constructor(
    id: number,
    title: string,
    subtitle: string,
    description: string,
    priority: PriorityEnum = PriorityEnum.LOW,
    hasAttachment: boolean = false,
    isCompleted: boolean = false,
  ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.priority = priority;
    this.hasAttachment = hasAttachment;
    this.isCompleted = isCompleted;
  }
}
