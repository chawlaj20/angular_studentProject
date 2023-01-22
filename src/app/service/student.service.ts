import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from '../model/student';

const baseUrl = "http://localhost:8080/api/StuData";


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }
  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(baseUrl);
  }

  get(id: any): Observable<Student> {
    return this.http.get<Student>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByCourse(course: any): Observable<Student[]> {
    return this.http.get<Student[]>(`${baseUrl}?course=${course}`);
  }
  
}
