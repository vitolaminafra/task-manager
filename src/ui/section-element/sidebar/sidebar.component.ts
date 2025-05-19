import { Component, OnInit } from '@angular/core';
import {
  Circle,
  CirclePlus,
  LucideAngularModule,
  Moon,
  SquareCheck,
  Sun,
  Trash2,
} from 'lucide-angular';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Tab } from '../../../class/tab';
import { TabService } from '../../../service/tab.service';
import { ThemeService } from '../../../service/theme.service';
import { AddTabModalComponent } from '../add-tab-modal/add-tab-modal.component';
import HSOverlay from '@preline/overlay';
import { MyButtonComponent } from '../../base-element/my-button/my-button.component';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';

@Component({
  selector: 'app-sidebar',
  imports: [
    LucideAngularModule,
    NgForOf,
    NgClass,
    AddTabModalComponent,
    NgIf,
    MyButtonComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  selectedTabPosition: number = -1;

  protected readonly GridIcon = Circle;
  protected readonly CompletedIcon = SquareCheck;

  protected readonly AddTabIcon = CirclePlus;
  protected readonly DeleteTabIcon = Trash2;

  protected readonly MoonIcon = Moon;
  protected readonly SunIcon = Sun;

  protected tabs: Tab[] = [];

  constructor(
    private tabService: TabService,
    protected themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.initTabs();
  }

  private initTabs() {
    this.tabService.tabs$.subscribe((tabs) => {
      this.tabs = [];
      this.tabs = tabs;

      if (tabs.length > 0) {
        this.onTabClick(0);
      }
    });
  }

  onTabClick(event: number) {
    if (this.selectedTabPosition != -1) {
      this.tabs[this.selectedTabPosition].deselect();
    }
    this.tabs[event].select();
    this.selectedTabPosition = event;
    this.tabService.changeSelectedTab(this.tabs[event]);
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  addTab() {
    HSOverlay.open('#add-tab-modal');
  }

  deleteTab() {
    const toDeletePosition = this.selectedTabPosition;

    this.selectedTabPosition = -1;

    this.tabService.deleteTab(this.tabs[toDeletePosition]);
    this.initTabs();
  }

  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;
}
