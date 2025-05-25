import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../class/task';
import { TabService } from './tab.service';
import { ToastNotificationService } from './toast-notification.service';
import { ToastNotificationEnum } from '../enum/toast-notification.enum';

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
      if (tab != undefined) {
        const savedTasksByTab = localStorage.getItem('1');

        const parsedTasks = savedTasksByTab ? JSON.parse(savedTasksByTab) : [];
        if (parsedTasks.length > 0) {
          parsedTasks.forEach((task: any) => {
            this.tasksSubject.next([
              ...this.tasksSubject.getValue(),
              new Task(
                task.title,
                task.subtitle,
                task.description,
                task.priority,
                task.attachment,
                task.isCompleted,
              ),
            ]);
          });
        }
      }
    });
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, task]);

    localStorage.setItem(
      this.tabService.getCurrentTab()!.title,
      JSON.stringify(this.tasksSubject.getValue()),
    );

    this.toastNotificationService.showNotification(
      ToastNotificationEnum.SUCCESS,
      'Task added successfully',
    );
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
