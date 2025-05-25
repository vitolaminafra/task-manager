import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../class/tab';
import { ToastNotificationService } from './toast-notification.service';
import { ToastNotificationEnum } from '../enum/toast-notification.enum';
import { db } from '../db/db';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private currentTabSubject = new BehaviorSubject<Tab | undefined>(undefined);
  currentTab$ = this.currentTabSubject.asObservable();

  private tabsSubject = new BehaviorSubject<Tab[]>([]);
  tabs$ = this.tabsSubject.asObservable();

  constructor(private toastNotificationService: ToastNotificationService) {
    this.initializeTabs();
  }

  private initializeTabs() {
    this.tabsSubject.next([]);

    db.tabs.toArray().then((tabs) => {
      this.tabsSubject.next(tabs);
      tabs.forEach((tab) => {
        if (tab.isActive) this.changeSelectedTab(tab);
      });
    });
  }

  changeSelectedTab(tab: Tab | undefined) {
    if (tab != undefined) {
      db.tabs
        .filter((filteredTab) => filteredTab.id != tab!.id)
        .modify({ isActive: false })
        .then(() => {
          db.tabs.update(tab!.id, { isActive: true }).then(() => {});
        });
    } else {
      db.tabs
        .toCollection()
        .modify({ isActive: false })
        .then(() => {});
    }

    this.currentTabSubject.next(tab);
  }

  addTab(tab: Tab) {
    db.tabs
      .add(tab)
      .then(async () => {
        const currentTabs = this.tabsSubject.getValue();
        this.tabsSubject.next([...currentTabs, tab]);

        this.toastNotificationService.showNotification(
          ToastNotificationEnum.SUCCESS,
          'Tab added successfully',
        );
      })
      .catch((error) => {
        this.toastNotificationService.showNotification(
          ToastNotificationEnum.ERROR,
          'Error adding tab: ' + error + '',
        );
      });
  }

  deleteTab(tab: Tab): void {
    db.tabs.delete(tab.id).then(() => {
      this.initializeTabs();
      this.changeSelectedTab(undefined);
      this.toastNotificationService.showNotification(
        ToastNotificationEnum.SUCCESS,
        'Tab deleted successfully',
      );
    });
  }

  getCurrentTab(): Tab | undefined {
    return this.currentTabSubject.getValue();
  }
}
