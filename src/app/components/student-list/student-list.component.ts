import { Component } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  students?: Student[];
  currentStudent: Student = {};
  currentIndex = -1;
  name = '';
  course='';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.retrieveStudents();
  }

  retrieveStudents(): void {
    this.studentService.getAll()
      .subscribe({
        next: (data) => {
          this.students = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveStudents();
    this.currentStudent = {};
    this.currentIndex = -1;
  }

  setActiveStudents(student: Student, index: number): void {
    this.currentStudent = student;
    this.currentIndex = index;
  }

  removeAllStudents(): void {
    this.studentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchCourse(): void {
    this.currentStudent = {};
    this.currentIndex = -1;

    this.studentService.findByCourse(this.course)
      .subscribe({
        next: (data) => {
          this.students = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


}
