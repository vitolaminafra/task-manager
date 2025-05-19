import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../class/tab';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private currentTabSubject = new BehaviorSubject<Tab | undefined>(undefined);
  currentTab$ = this.currentTabSubject.asObservable();

  private tabsSubject = new BehaviorSubject<Tab[]>([]);
  tabs$ = this.tabsSubject.asObservable();

  constructor() {
    this.initializeTabs();
  }

  private initializeTabs(): void {
    this.changeSelectedTab(undefined);
    this.tabsSubject.next([]);

    const savedTabs = localStorage.getItem('tabs');

    const parsedTabs = savedTabs ? JSON.parse(savedTabs) : [];

    if (parsedTabs.length > 0) {
      parsedTabs.forEach((tab: any) => {
        this.tabsSubject.next([
          ...this.tabsSubject.getValue(),
          new Tab(tab.title, tab.isCompleted, false, tab.id),
        ]);
      });
      this.changeSelectedTab(parsedTabs[0]);
    }
  }

  changeSelectedTab(tab: Tab | undefined): void {
    this.currentTabSubject.next(tab);
  }

  addTab(tab: Tab): void {
    const existingTabs = this.tabsSubject.getValue();
    this.tabsSubject.next([...existingTabs, tab]);

    localStorage.setItem('tabs', JSON.stringify(this.tabsSubject.getValue()));
  }

  deleteTab(tab: Tab): void {
    const existingTabs = this.tabsSubject.getValue();
    const filteredTabs = existingTabs.filter((t) => t.id !== tab.id);
    this.tabsSubject.next(filteredTabs);

    this.changeSelectedTab(undefined);

    localStorage.setItem('tabs', JSON.stringify(this.tabsSubject.getValue()));
  }

  getCurrentTab(): Tab | undefined {
    return this.currentTabSubject.getValue();
  }
}
