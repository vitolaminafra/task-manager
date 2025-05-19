import { Tab } from '../app/class/tab';
import { Task } from '../app/class/task';
import { PriorityEnum } from '../app/model/priority.enum';

export class MockData {
  public static exampleTabs: Tab[] = [
    new Tab('Wave 2.1.0', false, true),
    new Tab('Wave 2.0.0', false, false),
    new Tab('Wave 1.9.0', false, false),
    new Tab('Wave 1.8.0', false, false),
    new Tab('Wave 1.7.0', true, false),
    new Tab('Wave 1.6.0', true, false),
  ];

  public static tasksOne: Task[] = [
    new Task(
      'Update user interface',
      'Design > UI/UX > Implementation',
      'Implement new design system across the platform',
      PriorityEnum.HIGH,
      false,
      true,
    ),
    new Task(
      'Fix database connection',
      'Backend > Database',
      'Resolve intermittent connection issues in production',
      PriorityEnum.HIGH,
      true,
      false,
    ),
    new Task(
      'Optimize image loading',
      'Frontend > Performance',
      'Implement lazy loading for better performance',
      PriorityEnum.MEDIUM,
      true,
      true,
    ),
    new Task(
      'Add user analytics',
      'Analytics > Implementation',
      'Integrate Google Analytics for user tracking',
      PriorityEnum.MEDIUM,
      false,
      true,
    ),
    new Task(
      'Update documentation',
      'Documentation > API',
      'Review and update API documentation',
      PriorityEnum.LOW,
      false,
      false,
    ),
    new Task(
      'Security audit',
      'Security > Auth',
      'Perform security review of authentication system',
      PriorityEnum.HIGH,
      true,
      false,
    ),
    new Task(
      'Bug fixes',
      'Maintenance > Bugs',
      'Address reported issues in the feedback module',
      PriorityEnum.LOW,
      true,
      false,
    ),
  ];

  public static tasksTwo: Task[] = [
    new Task(
      'Update user interface',
      'Design > UI/UX > Implementation',
      'Implement new design system across the platform',
      PriorityEnum.HIGH,
      false,
      true,
    ),
    new Task(
      'Fix database connection',
      'Backend > Database',
      'Resolve intermittent connection issues in production',
      PriorityEnum.HIGH,
      true,
      false,
    ),
  ];
}
