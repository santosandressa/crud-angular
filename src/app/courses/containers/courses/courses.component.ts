import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '@shared/components/error-dialog/error-dialog.component';
import { catchError, Observable, of } from 'rxjs';
import { Course } from 'src/app/shared/models/course.model';
import { CoursesService } from '../../../shared/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  color: ThemePalette = 'primary';

  mode: ProgressSpinnerMode = 'indeterminate';

  value = 50;

  courses$: Observable<Course[]> | null = null;

  displayedColumns = ['name', 'category', 'add'];

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.courseService.list().pipe(
      catchError(() => {
        this.onError('Erro ao carregar cursos');
        return of([]);
      }),
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o curso?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.remove(course._id).subscribe(
          () => {
            this.refresh();
            this.onSuccess();
          },
          () => this.onError('Erro ao remover curso'),
        );
      }
    });
  }

  private onSuccess() {
    this._snackBar.open('Curso removido com sucesso', 'OK', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
