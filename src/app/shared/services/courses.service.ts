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
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(1000),
      tap((courses) => console.log(courses))
    );
  }

  save(record: Partial<Course>) {
    console.log(record)
    if (record._id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }
}
