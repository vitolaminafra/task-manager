import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../app/class/tab';
import { MockData } from '../app/mock-data';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private currentTabSubject = new BehaviorSubject<Tab | undefined>(undefined);
  currentTab$ = this.currentTabSubject.asObservable();

  private tabsSubject = new BehaviorSubject<Tab[]>([]);
  tabs$ = this.tabsSubject.asObservable();

  changeTab(tab: Tab): void {
    this.currentTabSubject.next(tab);
  }

  addTab(tab: Tab): void {
    const currentTabs = this.tabsSubject.getValue();
    this.tabsSubject.next([...currentTabs, tab]);
  }

  /* MOCK DATA FUNCTIONS */
  generateMockTabs() {
    this.tabsSubject.next([...MockData.exampleTabs]);
  }
}
