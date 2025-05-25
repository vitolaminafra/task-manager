import Dexie, { Table } from 'dexie';
import { Tab } from '../class/tab';
import { Task } from '../class/task';

export class AppDB extends Dexie {
  tabs!: Table<Tab>;
  tasks!: Table<Task>;

  constructor() {
    super('taskManagerDB');
    this.version(3).stores({
      tabs: '++id',
      tasks: '++id',
    });
  }
}

export const db = new AppDB();
