import { Component, OnInit } from '@angular/core';
import {
  Circle,
  LucideAngularModule,
  Moon,
  SquareCheck,
  Sun,
} from 'lucide-angular';
import { NgClass, NgForOf } from '@angular/common';
import { Tab } from '../../class/tab';
import { TabService } from '../../../service/tab.service';
import { ThemeService } from '../../../service/theme.service';

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

  protected readonly MoonIcon = Moon;
  protected readonly SunIcon = Sun;

  protected tabs: Tab[] = [];

  constructor(
    private tabService: TabService,
    protected themeService: ThemeService,
  ) {}

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

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
