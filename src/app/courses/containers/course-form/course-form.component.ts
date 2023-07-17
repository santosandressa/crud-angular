import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  form = this.fb.group({
    _id: new FormControl('', {nonNullable: true}),
    name: new FormControl('', {nonNullable: true}),
    category: new FormControl('', {nonNullable: true}),
  });

  categories = [null, 'front-end', 'back-end', 'dev-ops', 'mobile'];

  constructor(
    private fb: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
       _id: course._id,
      name: course.name,
      category: course.category,
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this._snackBar.open('Curso salvo com sucesso', 'OK', {});
    this.onCancel();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar o curso', 'OK', {});
  }
}
