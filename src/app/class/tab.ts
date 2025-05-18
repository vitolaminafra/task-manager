export class Tab {
  id: number;
  title: string;
  isCompleted: boolean = false;
  isActive: boolean = false;

  constructor(
    id: number,
    title: string,
    isCompleted: boolean,
    isActive?: boolean,
  ) {
    this.id = id;
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

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
