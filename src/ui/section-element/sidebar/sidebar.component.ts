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
import { TruncatePipe } from '../../../pipe/truncate.pipe';
import { ConfirmationModalService } from '../../../service/confirmation-modal.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    LucideAngularModule,
    NgForOf,
    NgClass,
    AddTabModalComponent,
    NgIf,
    MyButtonComponent,
    TruncatePipe,
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

  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;

  protected tabs: Tab[] = [];

  protected tabCounter = new Map<Tab, number>();

  constructor(
    private tabService: TabService,
    private confirmationModalService: ConfirmationModalService,
    protected themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.initTabs();
  }

  private initTabs() {
    this.tabs = [];
    this.tabService.tabs$.subscribe((tabs) => {
      this.tabs = tabs;

      this.selectedTabPosition = -1;

      tabs.forEach((tab, index) => {
        if (tab.isActive) {
          this.selectedTabPosition = index;
        }
      });
    });

    this.tabService.tabCounter$.subscribe((tabCount) => {
      this.tabCounter = tabCount;
    });
  }

  onTabClick(event: number) {
    this.selectedTabPosition = event;
    this.tabs.forEach((tab) => {
      tab.isActive = tab.id === this.tabs[event].id;
    });
    this.tabService.changeSelectedTab(this.tabs[event]);
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  addTab() {
    HSOverlay.open('#add-tab-modal');
  }

  deleteTab() {
    this.confirmationModalService.open(
      {
        title: 'Delete tab',
        message: 'Are you sure you want to delete this tab?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      },
      () => {
        const toDeletePosition = this.selectedTabPosition;
        this.selectedTabPosition = -1;
        this.tabService.changeSelectedTab(undefined);
        this.tabService.deleteTab(this.tabs[toDeletePosition]);
        this.initTabs();
      },
    );
  }
}
