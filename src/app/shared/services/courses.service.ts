import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, first, tap } from 'rxjs';

import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private readonly API = 'api/v1/courses';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(this.API)
      .pipe(
        first(),
        delay(1000),
        tap((courses) => console.log(courses)));
  }

  save(record: Course) {
    return this.httpClient.post<Course>(this.API, record)
      .pipe(first());
  }
}
