import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { courseResolver } from '../shared/resolvers/course.resolver';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CoursesComponent } from './containers/courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'new',
    component: CourseFormComponent,
    resolve: { course: courseResolver}
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    resolve: { course: courseResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
