import {Component, OnInit} from '@angular/core';
import {TaskInterface} from './task/task/taskInterface'

import {TaskService} from "./task/task.service";
import {FormControl, Validators} from "@angular/forms";


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

  constructor(private readonly tasksService: TaskService) {

  }

  ngOnInit() {
    this.getTasks();

  }

  getTasks() {
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
    this.getTasks();   // вопрос с фильтром
  }

  showActTasks() {
    this.todoTasks = this.tasksService.showActTasks();
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
    this.progress = this.doneTasks / this.totalTasks;
    return this.progress
  }




}

