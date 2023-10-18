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

  newTaskControl = new FormControl('', Validators.required);

  constructor(private readonly tasksService: TaskService) {

  }

  ngOnInit() {
    this.getTasks();

  }

  getTasks() {
    this.showDoneTasks();
    this.showActTasks(); //Вопрос
    this.todoTasks = this.tasksService.getTasks();
    this.totalTasks = this.todoTasks.length;
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
  };


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
    this.todoTasks = this.tasksService.showActTasks();
    this.actTasks = this.todoTasks.length;
  }

  showDoneTasks() {
    this.todoTasks = this.tasksService.showDoneTasks();
    this.doneTasks = this.todoTasks.length;
  }

  showProgress() {
    this.progress = this.actTasks / this.totalTasks
    return this.progress
  }

}

