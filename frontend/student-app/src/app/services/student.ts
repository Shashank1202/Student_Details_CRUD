import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private baseUrl= 'http://localhost:5000/api/students';

  constructor(private http: HttpClient){}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>( `${this.baseUrl}/${id}`);

  }
  
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

