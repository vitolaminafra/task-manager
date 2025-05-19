import { Utilities } from '../../utility/utlities.js';

export class Tab {
  id: string;
  title: string;
  isCompleted: boolean = false;
  isActive: boolean = false;

  constructor(title: string, isCompleted: boolean, isActive?: boolean) {
    this.id = Utilities.generateId();
    this.title = title;
    this.isCompleted = isCompleted;
    this.isActive = isActive ?? false;
  }

  select(): void {
    this.isActive = true;
  }

  deselect(): void {
    this.isActive = false;
  }
}
