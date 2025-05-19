import { Tab } from '../class/tab';
import { Task } from '../class/task';
import { PriorityEnum } from '../enum/priority.enum';

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
      '',
      true,
    ),
    new Task(
      'Fix database connection',
      'Backend > Database',
      'Resolve intermittent connection issues in production',
      PriorityEnum.HIGH,
      '',
      false,
    ),
    new Task(
      'Optimize image loading',
      'Frontend > Performance',
      'Implement lazy loading for better performance',
      PriorityEnum.MEDIUM,
      '',
      true,
    ),
    new Task(
      'Add user analytics',
      'Analytics > Implementation',
      'Integrate Google Analytics for user tracking',
      PriorityEnum.MEDIUM,
      '',
      true,
    ),
    new Task(
      'Update documentation',
      'Documentation > API',
      'Review and update API documentation',
      PriorityEnum.LOW,
      '',
      false,
    ),
    new Task(
      'Security audit',
      'Security > Auth',
      'Perform security review of authentication system',
      PriorityEnum.HIGH,
      '',
      false,
    ),
    new Task(
      'Bug fixes',
      'Maintenance > Bugs',
      'Address reported issues in the feedback module',
      PriorityEnum.LOW,
      '',
      false,
    ),
  ];

  public static tasksTwo: Task[] = [
    new Task(
      'Update user interface',
      'Design > UI/UX > Implementation',
      'Implement new design system across the platform',
      PriorityEnum.HIGH,
      '',
      true,
    ),
    new Task(
      'Fix database connection',
      'Backend > Database',
      'Resolve intermittent connection issues in production',
      PriorityEnum.HIGH,
      '',
      false,
    ),
  ];
}
