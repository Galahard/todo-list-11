import {Component, OnInit, Input} from '@angular/core';
import {TaskInterface} from './task/task/taskInterface'

import {TaskService} from "./task/task.service";
import {FormControl, Validators} from "@angular/forms";

import {ModalService} from "./task/modal/modal.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular todo';
  p: number = 1;

  tasksPerPage: number = 5;
  totalTasks: any;
  actTasks: number;
  doneTasks: number;

  progress: number;
  todoTasks: TaskInterface[] = [];

  clickedAct: boolean = false;
  clickedDone: boolean = false;
  clickedAll: boolean = false;

  newTaskControl = new FormControl('', Validators.required);

  isVisible: boolean;


  constructor(private readonly tasksService: TaskService, private modalService: ModalService) {


  }

  ngOnInit() {
    this.getTasks();
    console.log(this.modalService.isVisible.value)
    this.toggle()
  }

  getTasks() {
    this.showActTasks(); ///// вопрос
    this.showDoneTasks();
    this.showAllTasks();

    if (this.clickedAct) {
      this.showActTasks();
    } else if (this.clickedDone) {
      this.showDoneTasks();
    } else {
      this.showAllTasks();
    }
    this.showProgress();


  }

  addTask() {
    this.tasksService.addTask(this.newTaskControl.value);
    this.getTasks();
    this.newTaskControl.setValue('')
  }


  deleteTaskCallback = (id: number) => {
    this.tasksService.deleteTask(id);
    this.getTasks();
  }

  editTaskCallback = (id: number) => {
    this.tasksService.editTask(id);
    this.getTasks();
    console.log(this.modalService.isVisible.value)
  }

  clearTasks() {
    this.tasksService.clearTask();
    this.getTasks();
  }

  // deleteTask(id: number) {
  //   this.tasksService.deleteTask(id);
  //   this.getTasks();
  // }


  checkTask(id: number) {
    this.tasksService.checkTask(id);
    this.getTasks();
  }

  showActTasks() {
    this.todoTasks = this.tasksService.showActTasks(); //переделать все в сервис
    this.actTasks = this.todoTasks.length;

  }

  showDoneTasks() {
    this.todoTasks = this.tasksService.showDoneTasks();
    this.doneTasks = this.todoTasks.length;
  }

  showAllTasks() {
    this.todoTasks = this.tasksService.showAllTasks();
    this.totalTasks = this.todoTasks.length;

  }


  showProgress() {
    this.progress = this.doneTasks / this.totalTasks; ///в сервис расчет
    return this.progress
  }

  toggle() {
    this.isVisible = this.modalService.isVisible.value
    return this.isVisible

  }


}

