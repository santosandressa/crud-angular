import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';

import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

export const courseResolver: ResolveFn<Course> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  service: CoursesService = inject(CoursesService)
) => {
  if (route.params && route.params['id']) {
    return service.loadById(route.params['id']);
  }

  return of({
    _id: '',
    name: '',
    category: '',
  });
};
