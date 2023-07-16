import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form!: FormGroup;
  categories = [null, 'front-end', 'back-end', 'dev-ops', 'mobile'];

  constructor(
    private fb: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: [null],
      category: [null],
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => console.log(result),
      error: () => this.onError(),
    });
  }

  onCancel() {
    console.log('onCancel');
  }

  private onError() {
    this._snackBar.open('Erro ao salvar o curso', 'OK', {});
  }
}
