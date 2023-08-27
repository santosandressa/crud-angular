import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course.model';
import { Lesson } from 'src/app/shared/models/lesson.model';

import { CoursesService } from '../../../shared/services/courses.service';
import { FormUtilsService } from '../../../shared/utils/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  categories = [null, 'front-end', 'back-end', 'dev-ops', 'mobile'];

  constructor(
    private fb: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.fb.group({
      _id: [course?._id],
      name: [
        course?.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
      ],
      category: [course?.category, [Validators.required]],
      lessons: this.fb.array(this.retrieveLesson(course), Validators.required),
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
      });
    } else {
      this.formUtils.validateAllFormsFields(this.form);
    }
  }

  onCancel() {
    this.location.back();
  }

  private retrieveLesson(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', urlVideo: '' }) {
    return this.fb.group({
      id: [lesson.id],
      name: [
        lesson.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
      ],
      urlVideo: [lesson.urlVideo, [Validators.required]],
    });
  }

  private onSuccess() {
    this._snackBar.open('Curso salvo com sucesso', 'OK', {});
    this.onCancel();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar o curso', 'OK', {});
  }
}
