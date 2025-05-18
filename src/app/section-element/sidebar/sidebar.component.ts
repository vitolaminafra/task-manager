import { Component, OnInit } from '@angular/core';
import { Circle, LucideAngularModule, SquareCheck } from 'lucide-angular';
import { NgClass, NgForOf } from '@angular/common';
import { Tab } from '../../class/tab';
import { TabService } from '../../../service/tab.service';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, NgForOf, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  selectedTabPosition: number = 0;

  protected readonly GridIcon = Circle;
  protected readonly CompletedIcon = SquareCheck;

  protected tabs: Tab[] = [];

  constructor(private tabService: TabService) {}

  ngOnInit() {
    this.tabService.tabs$.subscribe((tabs) => {
      this.tabs = tabs;
      this.tabService.changeTab(tabs[0]);
    });
  }

  onTabClick(event: number) {
    this.tabs[this.selectedTabPosition].deselect();
    this.tabs[event].select();
    this.selectedTabPosition = event;
    this.tabService.changeTab(this.tabs[event]);
  }
}
