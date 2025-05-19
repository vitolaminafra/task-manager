import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';
import {
  BadgePlus,
  LucideAngularModule,
  LucideIconData,
  Smile,
} from 'lucide-angular';
import { NgClass, NgIf } from '@angular/common';
import { ButtonColorEnum } from '../../../enum/button-color.enum';

@Component({
  selector: 'app-my-button',
  imports: [NgIf, LucideAngularModule, NgClass],
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.css',
})
export class MyButtonComponent {
  @Input() buttonTypology: ButtonTypologyEnum = ButtonTypologyEnum.ICON_ONLY;

  @Input() icon: LucideIconData = Smile;
  @Input() tooltip: string = '';

  @Input() buttonColor: ButtonColorEnum = ButtonColorEnum.BLUE;
  @Input() text: string = '';

  @Output() onClick$ = new EventEmitter<MouseEvent>();

  protected readonly PlaceholderIcon = Smile;
  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;

  onClick($event: MouseEvent) {
    this.onClick$.emit($event);
  }

  protected readonly AddTaskIcon = BadgePlus;
}
