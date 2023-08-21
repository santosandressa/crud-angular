import { Lesson } from "./lesson.model";

export interface Course {
  _id: string;
  name: string
  category: string;
  lessons?: Lesson[];
}
