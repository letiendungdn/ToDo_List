import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

const fadeStrikeThroughAnimation = trigger('fadeStrikeThrough', [
  state(
    'active',
    style({
      fontSize: '18px',
      color: 'black',
    })
  ),
  state(
    'complete',
    style({
      fontSize: '17px',
      color: 'lightgrey',
      textDecoration: 'line-through',
    })
  ),
  transition('active <=> complete', [animate(250)]),
]);

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeStrikeThroughAnimation],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  isHovered = false;
  isEditing = false;

  constructor() {}

  ngOnInit(): void {}
  submitEdit(event: KeyboardEvent) {
    const { keyCode } = event;
    event.preventDefault();
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  changeTodoStatus() {
    this.changeStatus.emit({
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    });
  }
  removeTodo() {
    this.deleteTodo.emit(this.todo);
  }
}
