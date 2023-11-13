import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskInterface} from "./taskInterface";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: TaskInterface;
  @Input() deleteFn: (a: number) => void;
  @Input() editFn: (a: number) => void;

  //@Output() deleteTask = new EventEmitter <void>();
  @Output() checkTask = new EventEmitter<void>();

  deleteTask() {
    this.deleteFn(this.task.id)
  }

  editTask() {
    this.editFn(this.task.id)
  }
}
