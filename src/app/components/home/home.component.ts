import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data = {
    pendings: '',
    inProgress: '',
    done: ''
  };

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllTodo();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateTodo();

    }
  }

  addTodo(todo) {
    const obj = { todo: todo.value };
    this.todoService.addTodo(obj).subscribe((res: any) => {
      this.getAllTodo();
      this.openSnackBar(res.message);
    }, (err) => {
      console.log(err);
    })
  }

  getAllTodo() {
    this.todoService.getAllTodos().subscribe((res) => {
      console.log(res);
      Object.keys(res).forEach((key) => {
        this.data[key] = res[key];
      });
      console.log(this.data);
    }, (err) => {
      console.log(err);
    })
  }

  updateTodo() {
    this.todoService.updateTodo(this.data)
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }

  removeTodo(id) {
    this.todoService.removeTodo(id)
      .subscribe(
        (res : any) => {
          this.openSnackBar(res.message);
          this.getAllTodo();
        }, (err) => {
          console.log(err);
        }
      )      
  }

  openSnackBar(message : string) {
    this._snackBar.open(message, 'Tamam', {
      duration: 3000,
    });
  }
}
