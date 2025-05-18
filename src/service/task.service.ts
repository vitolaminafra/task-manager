import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../app/class/task';
import { MockData } from '../app/mock-data';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private selectedTaskSubject = new BehaviorSubject<Task | undefined>(
    undefined,
  );
  selectedTask$ = this.selectedTaskSubject.asObservable();

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, task]);
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.tasksSubject.getValue();
    const filteredTasks = currentTasks.filter((task) => task.id !== taskId);
    this.tasksSubject.next(filteredTasks);
  }

  setSelectedTask(task: Task | undefined): void {
    this.selectedTaskSubject.next(task);
  }

  /* MOCK DATA FUNCTIONS */
  generateMockTasksOne() {
    this.tasksSubject.next([...MockData.tasksOne]);
  }
  generateMockTasksTwo() {
    this.tasksSubject.next([...MockData.tasksTwo]);
  }
}
