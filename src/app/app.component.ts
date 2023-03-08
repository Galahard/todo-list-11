import {Component, Input, OnInit} from '@angular/core';
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


  todoTasks: TaskInterface[] = [];

  newTaskControl = new FormControl('', Validators.required);

  constructor(private readonly tasksService: TaskService) {

  }

  ngOnInit() {
    this.getTasks();

  }

  getTasks() {
    this.todoTasks = this.tasksService.getTasks();

  }

  addTask() {
    this.tasksService.addTask(this.newTaskControl.value);
    this.getTasks();
    this.newTaskControl.setValue('')
  }


  deleteTaskCallback = (id: number) => {
    this.tasksService.deleteTask(id);
    this.getTasks();
  };


  clearTasks() {
    this.tasksService.clearTask();
    this.getTasks();
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id);
    this.getTasks();
  }

  checkTask(id: number) {
    this.tasksService.checkTask(id);
    this.getTasks();
  }

}

