// angular2-todo-list-app/app/app.component.ts

import { Component, ViewEncapsulation } from 'angular2/core';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'todo-app',
  templateUrl: 'app/app.html',
  styles: [
    `ul li {
      list-style: none;
    }
    .completed {
      text-decoration: line-through;
    }`
  ],
  encapsulation: ViewEncapsulation.Emulated
})

export class AppComponent {
  todos: Todo[] = [{
      label: 'Learn Angular 2',
      completed: false
  }, {
      label: 'Go to market',
      completed: false
  }];
  name: string = 'Nay';
  addTodo(label) {
    this.todos.push({
      label,
      completed: false
    })
  }
  removeTodo(idx) {
    this.todos.splice(idx, 1);
  }
  toggleCompletion(idx) {
    let todo = this.todos[idx];
    todo.completed = !todo.completed;
  }
}
