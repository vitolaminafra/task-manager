import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TabService } from '../../../service/tab.service';
import { Tab } from '../../class/tab';
import HSOverlay from '@preline/overlay';

@Component({
  selector: 'app-add-tab-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-tab-modal.component.html',
  styleUrl: './add-tab-modal.component.css',
})
export class AddTabModalComponent {
  tabNameInput = new FormControl('');

  constructor(private tabService: TabService) {}
  addTab() {
    this.tabService.addTab(
      new Tab(this.tabNameInput.value ?? '', false, false),
    );
    this.tabNameInput.reset();
    HSOverlay.close('#add-tab-modal');
  }
}
