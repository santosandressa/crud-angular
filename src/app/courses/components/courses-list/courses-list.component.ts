import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'add'];

  constructor() {}

  onAdd() {
    console.log('clicked!!!');
    this.add.emit(true);
  }

  onEdit(course: Course) {
     console.log('clicked!!!');
    this.edit.emit(course);
  }
}
