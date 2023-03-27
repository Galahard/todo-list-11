import {Injectable} from '@angular/core';
import {TaskInterface} from "./task/taskInterface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  session: any;

  tasks: TaskInterface[] = [];

  constructor() {
  }

  addTask(title: string) {
    const id = Math.max(...this.tasks.map(task => task.id), 0) + 1;
    this.tasks.unshift({id: id, title: title, checkbox: false});
    this.saveTasks();

  };


  getTasks() {
    this.loadTasks();
    return this.tasks;


  };

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id != id);
    this.saveTasks();
  };

  clearTask() {
    localStorage.clear();
    this.loadTasks();
  };


  checkTask(id: number) {
    const checkedTask = this.tasks.find(task => task.id === id);
    if (checkedTask) {
      checkedTask.checkbox = !checkedTask.checkbox
    }
    this.saveTasks();
  };

  private saveTasks() {
    localStorage.setItem('session', JSON.stringify(this.tasks));

  };

  private loadTasks() {
    this.tasks = JSON.parse(localStorage.getItem('session') ?? '[]');

  }


  showActTasks() {
    this.loadTasks();
    this.tasks = this.tasks.filter(tasks => !tasks.checkbox);
    return this.tasks;
  }

  showDoneTasks() {
    this.loadTasks();
    this.tasks = this.tasks.filter(tasks => tasks.checkbox);
    return this.tasks;
  }


}
