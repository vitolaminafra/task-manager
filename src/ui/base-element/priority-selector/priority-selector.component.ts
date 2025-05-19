import { Component } from '@angular/core';
import { PriorityBadgeComponent } from '../priority-badge/priority-badge.component';
import { PriorityEnum } from '../../../enum/priority.enum';

@Component({
  selector: 'app-priority-selector',
  imports: [PriorityBadgeComponent],
  templateUrl: './priority-selector.component.html',
  styleUrl: './priority-selector.component.css',
})
export class PrioritySelectorComponent {
  private _selectedPriority: PriorityEnum | undefined = undefined;

  get selectedPriority(): PriorityEnum | undefined {
    return this._selectedPriority;
  }

  set selectedPriority(value: PriorityEnum | undefined) {
    this._selectedPriority = value;
  }
  protected readonly PriorityEnum = PriorityEnum;
}
