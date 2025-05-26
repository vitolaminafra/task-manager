import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../class/task';
import { TabService } from './tab.service';
import { ToastNotificationService } from './toast-notification.service';
import { ToastNotificationEnum } from '../enum/toast-notification.enum';
import { db } from '../db/db';
import { PriorityEnum } from '../enum/priority.enum';

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

            this.orderByCompletedLast();

            if (tab.isOrderByPriority) {
              this.orderByPriorityDescending();
            }
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

      this.handleOrder();

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

      this.handleOrder();
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

  private orderByCompletedLast() {
    const sortedTasks = [...this.tasksSubject.getValue()].sort((a, b) => {
      return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
    });
    this.tasksSubject.next(sortedTasks);
  }

  private orderById() {
    const sortedTasks = [...this.tasksSubject.getValue()].sort((a, b) => {
      return Number(a.id) - Number(b.id);
    });
    this.tasksSubject.next(sortedTasks);

    this.orderByCompletedLast();
  }

  orderByPriority(isOrderByPriority: boolean) {
    if (isOrderByPriority) {
      this.orderByPriorityDescending();
    } else {
      this.orderById();
    }
    this.tabService.updateOrderByPriority(isOrderByPriority);
  }

  private orderByPriorityDescending() {
    const sortedTasks = [...this.tasksSubject.getValue()].sort((a, b) => {
      if (!a.isCompleted && !b.isCompleted) {
        const priorityOrder: Record<PriorityEnum, number> = {
          [PriorityEnum.HIGH]: 1,
          [PriorityEnum.MEDIUM]: 2,
          [PriorityEnum.LOW]: 3,
          [PriorityEnum.DONE]: 4,
        };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return 0;
    });

    this.tasksSubject.next(sortedTasks);
  }

  handleOrder() {
    this.orderById();

    if (this.tabService.getCurrentTab()!.isOrderByPriority) {
      this.orderByPriorityDescending();
    }
  }
}
