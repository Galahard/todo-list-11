import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskInterface} from "./taskInterface";
import {ModalService} from "../modal/modal.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: TaskInterface;
  @Input() deleteFn: (a: number) => void;


  //@Output() deleteTask = new EventEmitter <void>();
  @Output() checkTask = new EventEmitter<void>();

  constructor(private modalService: ModalService) {
  } ;


  deleteTask() {
    this.deleteFn(this.task.id)
  }

  editTask() {
    this.modalService.openModal(this.task)

  }


}
