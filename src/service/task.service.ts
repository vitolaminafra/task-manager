import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../class/task';
import { TabService } from './tab.service';
import { ToastNotificationService } from './toast-notification.service';
import { ToastNotificationEnum } from '../enum/toast-notification.enum';
import { db } from '../db/db';

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

  constructor(
    private tabService: TabService,
    private toastNotificationService: ToastNotificationService,
  ) {
    this.initializeTasks();
  }

  public initializeTasks(): void {
    this.tabService.currentTab$.subscribe((tab) => {
      this.tasksSubject.next([]);

      if (tab !== undefined) {
        db.tasks
          .filter((filteredTask) => filteredTask.tabId == tab.id)
          .toArray()
          .then((tasks) => {
            this.tasksSubject.next(tasks);
          });
      }
    });
  }

  addTask(task: Task): void {
    task.tabId = this.tabService.getCurrentTab()!.id;
    db.tasks.add(task).then(() => {
      const currentTasks = this.tasksSubject.getValue();
      this.tasksSubject.next([...currentTasks, task]);

      this.tabService.updateCountersMap(this.tabService.getCurrentTab()!);

      this.toastNotificationService.showNotification(
        ToastNotificationEnum.SUCCESS,
        'Task added successfully',
      );
    });
  }

  markAsDone(task: Task) {
    db.tasks.update(task.id, { isCompleted: true }).then(() => {
      task.isCompleted = true;

      this.tabService.updateCountersMap(this.tabService.getCurrentTab()!);
    });
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(taskId: string): void {
    const currentTasks = this.tasksSubject.getValue();
    const filteredTasks = currentTasks.filter((task) => task.id !== taskId);
    this.tasksSubject.next(filteredTasks);
  }

  setSelectedTask(task: Task | undefined): void {
    this.selectedTaskSubject.next(task);
  }
}
