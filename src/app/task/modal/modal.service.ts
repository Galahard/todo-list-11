import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TaskInterface} from "../task/taskInterface";

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  isVisible = new BehaviorSubject<boolean>(false)
  currentTask: TaskInterface;


  constructor() {
  }

  openModal(task: TaskInterface) {
    this.isVisible.next(true)
    this.currentTask = task;
  }

  closeModal() {
    this.isVisible.next(false)
  }


}
