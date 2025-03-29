import { computed, Injectable, signal } from '@angular/core';
import { Task } from './interfaces/task.interface';
import { State } from './interfaces/state';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private _tasks = signal<Task[]>(this.loadFromLocalStorage());
  private _searchText = signal<string>('');

  public tasks = computed(() => {
    let filteredTasks = this._tasks().filter((task) => {
      const state = this._state();
      if (state === 'Pending') return !task.completed;
      if (state === 'Completed') return task.completed;
      return true;
    });

    const searchText = this._searchText();
    if (searchText) {
      filteredTasks = filteredTasks.filter((task) =>
        task.text.toLowerCase().includes(searchText)
      );
    }
    return filteredTasks;
  });

  private _state = signal<State>('All');
  public numberOfTasks = computed<number>(() => this._tasks().length);
  public completedTasks = computed<number>(
    () => this._tasks().filter((task) => task.completed === true).length
  );
  constructor() {
    this.loadFromLocalStorage();
  }

  public isDeleting = signal<boolean>(false);

  addTask(task: Task) {
    this._tasks.update((tasks) => [...tasks, { ...task }]);
    this.saveToLocalStorage();
  }

  changeIsCompleted(id: number) {
    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    this.saveToLocalStorage();
  }

  searchTaskByText(text: string) {
    const formatedText = text.toLowerCase().trim();
    this._searchText.set(formatedText);
  }

  editValueTask(task: Task, text: string) {
    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, text: text } : t))
    );

    this.saveToLocalStorage();
  }

  searchByState(state: State) {
    this._state.set(state);
  }

  loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');

    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks()));
  }

  deleteTask(id: number) {
    const tasks = this._tasks().filter((task) => task.id !== id);

    this._tasks.set(tasks);

    this.saveToLocalStorage();
  }
}
