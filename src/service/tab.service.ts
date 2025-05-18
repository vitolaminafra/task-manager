import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from '../app/class/tab';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private currentTabSubject = new BehaviorSubject<Tab | undefined>(undefined);
  currentTab$ = this.currentTabSubject.asObservable();

  changeTab(tab: Tab): void {
    this.currentTabSubject.next(tab);
  }
}
