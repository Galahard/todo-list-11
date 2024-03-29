import {Injectable} from '@angular/core';
import {TaskInterface} from "./task/taskInterface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  session: any;
  actTasks: TaskInterface[] = [];
  doneTasks: TaskInterface[] = [];

  tasks: TaskInterface[] = [];
  numberActTasks: number;
  numberDoneTasks: number;
  totalTasks: number;

  progress: number;

  constructor() {
  }

  addTask(title: string) {
    if (title !== null && title !== '') {
      const id = Math.max(...this.tasks.map(task => task.id), 0) + 1;
      this.tasks.unshift({id: id, title: title, checkbox: false});
      this.saveTasks();
    }
  };


  getTasks() {
    this.loadTasks();
    this.countActTasks();
    this.countDoneTasks();
    this.countAllTasks()
    return this.tasks;

  };

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id != id);
    this.saveTasks();
  };

  editTask(id: number, newTitle: string) {
    this.tasks = this.tasks.map(item => {
      if (id != item.id) {
        return item
      }
      return {
        ...item,
        title: newTitle
      }
    })

    this.saveTasks();
  }


  clearTask() {
    localStorage.clear();
    this.loadTasks();
  };


  checkTask(id: number) {
    const checkedTask = this.tasks.find(task => task.id === id);
    if (checkedTask) {
      checkedTask.checkbox = !checkedTask.checkbox;
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
    this.actTasks = this.tasks.filter(tasks => !tasks.checkbox);
    return this.actTasks
  }

  showDoneTasks() {
    this.loadTasks();
    this.doneTasks = this.tasks.filter(tasks => tasks.checkbox);
    return this.doneTasks;
  }

  showAllTasks() {
    this.loadTasks();
    return this.tasks
  }

  countActTasks() {
    this.showActTasks();
    this.numberActTasks = this.actTasks.length;
    return this.numberActTasks;
  }

  countDoneTasks() {
    this.showDoneTasks();
    this.numberDoneTasks = this.doneTasks.length;
    return this.numberDoneTasks;
  }

  countAllTasks() {
    this.loadTasks();
    this.totalTasks = this.tasks.length;
    return this.totalTasks
  }

  countProgress() {
    this.progress = this.numberDoneTasks / this.totalTasks;
    return this.progress
  }
}
