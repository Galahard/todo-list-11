import {Component, OnInit} from '@angular/core';
import {TaskInterface} from './task/task/taskInterface'

import {TaskService} from "./task/task.service";
import {FormControl, Validators} from "@angular/forms";

import {ModalService} from "./task/modal/modal.service";
import {BehaviorSubject, filter} from "rxjs";


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


  activeTab: string = 'allTab';

  newTaskControl = new FormControl('', Validators.required);

  isVisible: BehaviorSubject<boolean>;


  constructor(private readonly tasksService: TaskService, private modalService: ModalService) {

  }

  ngOnInit() {
    this.isVisible = this.modalService.isVisible
    this.isVisible.pipe(filter(isVisible => !isVisible)).subscribe(() => this.getTasks())

  }

  getTasks() {
    this.tasksService.getTasks();
    this.actTasks = this.tasksService.numberActTasks
    this.doneTasks = this.tasksService.numberDoneTasks
    this.totalTasks = this.tasksService.totalTasks

    if (this.activeTab === "actTab") {
      this.showActTasks();
    } else if (this.activeTab === "doneTab") {
      this.showDoneTasks();
    } else if (this.activeTab === "allTab") {
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


  clearTasks() {
    this.tasksService.clearTask();
    this.getTasks();
  }


  checkTask(id: number) {
    this.tasksService.checkTask(id);
    this.getTasks();
  }

  showActTasks() {
    this.todoTasks = this.tasksService.showActTasks();
    this.activeTab = "actTab"
    return this.activeTab


  }

  showDoneTasks() {
    this.todoTasks = this.tasksService.showDoneTasks();
    this.activeTab = "doneTab"
    return this.activeTab

  }

  showAllTasks() {
    this.todoTasks = this.tasksService.showAllTasks();
    this.activeTab = "allTab"
    return this.activeTab


  }


  showProgress() {
    this.progress = this.tasksService.countProgress()
    return this.progress
  }




}

