import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MyButtonComponent } from '../../base-element/my-button/my-button.component';
import HSOverlay from '@preline/overlay';
import { ButtonColorEnum } from '../../../enum/button-color.enum';
import { ButtonTypologyEnum } from '../../../enum/button-typology.enum';
import { PriorityEnum } from '../../../enum/priority.enum';
import { PrioritySelectorComponent } from '../../base-element/priority-selector/priority-selector.component';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-add-task-modal',
  imports: [
    FormsModule,
    MyButtonComponent,
    ReactiveFormsModule,
    PrioritySelectorComponent,
  ],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css',
})
export class AddTaskModalComponent {
  @ViewChild('prioritySelector') prioritySelector:
    | PrioritySelectorComponent
    | undefined;

  protected readonly ButtonColorEnum = ButtonColorEnum;
  protected readonly ButtonTypologyEnum = ButtonTypologyEnum;
  protected readonly PriorityEnum = PriorityEnum;

  addTaskFormGroup = new FormGroup({
    title: new FormControl(''),
    subtitle: new FormControl(''),
    description: new FormControl(''),
    attachment: new FormControl(),
  });

  selectedAttachment: File | undefined = undefined;

  constructor(private taskService: TaskService) {}

  addTask() {
    let newTask: any = this.addTaskFormGroup.value;
    newTask.priority =
      this.prioritySelector?.selectedPriority ?? PriorityEnum.LOW;

    if (this.selectedAttachment) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedAttachment!);
      reader.onload = (result) => {
        newTask.attachment = result.target?.result;
      };
    } else {
      newTask.attachment = '';
    }

    this.taskService.addTask(newTask);

    this.resetForm();
    HSOverlay.close('#add-task-modal');
  }

  private resetForm() {
    this.addTaskFormGroup.reset();
    this.prioritySelector!.selectedPriority = undefined;
    this.selectedAttachment = undefined;
  }

  protected onFileChange($event: Event) {
    this.selectedAttachment = ($event.target as HTMLInputElement)
      .files![0] as File;
  }
}
