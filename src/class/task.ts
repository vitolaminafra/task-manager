import { PriorityEnum } from '../enum/priority.enum';

export class Task {
  id: string | undefined;
  title: string;
  subtitle: string;
  description: string;
  priority: PriorityEnum;
  attachment: string;
  isCompleted: boolean;
  tabId: number | undefined;

  constructor(
    title: string,
    subtitle: string,
    description: string,
    priority: PriorityEnum = PriorityEnum.LOW,
    attachment: string,
    isCompleted: boolean = false,
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.priority = priority;
    this.attachment = attachment;
    this.isCompleted = isCompleted;
  }
}
