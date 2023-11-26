import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ModalService} from "../modal/modal.service";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  newTitle = new FormControl('', Validators.required)

  constructor(private modalService: ModalService, private taskService: TaskService) {


  }

  ngOnInit(): void {
    this.newTitle.setValue(this.modalService.currentTask.title)
  }


  submit() {
    this.taskService.editTask(this.modalService.currentTask.id, this.newTitle.value)
    this.modalService.closeModal()
  }
}
