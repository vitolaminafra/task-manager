import { Tab } from './class/tab';
import { Task } from './class/task';
import { PriorityEnum } from './model/priority.enum';

export class MockData {
  public static exampleTabs: Tab[] = [
    new Tab(1, 'Wave 2.1.0', false, true),
    new Tab(2, 'Wave 2.0.0', false, false),
    new Tab(3, 'Wave 1.9.0', false, false),
    new Tab(4, 'Wave 1.8.0', false, false),
    new Tab(5, 'Wave 1.7.0', true, false),
    new Tab(6, 'Wave 1.6.0', true, false),
  ];

  public static tasksOne: Task[] = [
    new Task(
      1,
      'Update user interface',
      'Design > UI/UX > Implementation',
      'Implement new design system across the platform',
      PriorityEnum.HIGH,
      false,
      true,
    ),
    new Task(
      2,
      'Fix database connection',
      'Backend > Database',
      'Resolve intermittent connection issues in production',
      PriorityEnum.HIGH,
      true,
      false,
    ),
    new Task(
      3,
      'Optimize image loading',
      'Frontend > Performance',
      'Implement lazy loading for better performance',
      PriorityEnum.MEDIUM,
      true,
      true,
    ),
    new Task(
      4,
      'Add user analytics',
      'Analytics > Implementation',
      'Integrate Google Analytics for user tracking',
      PriorityEnum.MEDIUM,
      false,
      true,
    ),
    new Task(
      5,
      'Update documentation',
      'Documentation > API',
      'Review and update API documentation',
      PriorityEnum.LOW,
      false,
      false,
    ),
    new Task(
      6,
      'Security audit',
      'Security > Auth',
      'Perform security review of authentication system',
      PriorityEnum.HIGH,
      true,
      false,
    ),
    new Task(
      7,
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
      1,
      'Update user interface',
      'Design > UI/UX > Implementation',
      'Implement new design system across the platform',
      PriorityEnum.HIGH,
      false,
      true,
    ),
    new Task(
      2,
      'Fix database connection',
      'Backend > Database',
      'Resolve intermittent connection issues in production',
      PriorityEnum.HIGH,
      true,
      false,
    ),
  ];
}
