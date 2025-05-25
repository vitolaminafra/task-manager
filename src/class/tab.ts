export class Tab {
  id: number | undefined;
  title: string;
  isCompleted: boolean = false;
  isActive: boolean = false;

  constructor(title: string, isCompleted: boolean, isActive?: boolean) {
    this.title = title;
    this.isCompleted = isCompleted;
    this.isActive = isActive ?? false;
  }
}
