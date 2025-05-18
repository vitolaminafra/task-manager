import { Component, OnInit } from '@angular/core';
import { Grid2X2, LucideAngularModule, SquareCheck } from 'lucide-angular';
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

  protected readonly GridIcon = Grid2X2;
  protected readonly CompletedIcon = SquareCheck;

  constructor(private tabService: TabService) {}

  exampleTabs: Tab[] = [
    new Tab(1, 'Wave 2.1.0', false, true),
    new Tab(2, 'Wave 2.0.0', false, false),
    new Tab(3, 'Wave 1.9.0', false, false),
    new Tab(4, 'Wave 1.8.0', false, false),
    new Tab(5, 'Wave 1.7.0', true, false),
    new Tab(6, 'Wave 1.6.0', true, false),
  ];

  ngOnInit() {
    this.tabService.changeTab(this.exampleTabs[0]);
  }

  onTabClick(event: number) {
    this.exampleTabs[this.selectedTabPosition].deselect();
    this.exampleTabs[event].select();
    this.selectedTabPosition = event;
    this.tabService.changeTab(this.exampleTabs[event]);
  }
}
