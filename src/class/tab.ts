export class Tab {
  id: number | undefined;
  title: string;
  isActive: boolean = false;

  constructor(title: string, isActive?: boolean) {
    this.title = title;
    this.isActive = isActive ?? false;
  }
}
