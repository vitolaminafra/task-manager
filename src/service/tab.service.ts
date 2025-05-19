import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../app/class/tab';
import { MockData } from '../utility/mock-data';

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
          new Tab(tab.title, tab.isCompleted, false),
        ]);
      });
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

    //this.initializeTabs();
  }

  saveCurrentState() {
    localStorage.setItem('tabs', JSON.stringify(this.tabsSubject.getValue()));
  }

  /* MOCK DATA FUNCTIONS */
  generateMockTabs() {
    this.tabsSubject.next([...MockData.exampleTabs]);
  }
}
