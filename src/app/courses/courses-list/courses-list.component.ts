import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  
  readonly displayedColumns = ['name', 'category', 'add'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onAdd() {
    console.log('clicked!!!');
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
