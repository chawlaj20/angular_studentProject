import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {

  @Input() viewMode = false;

  @Input() currentStudent: Student = {
    name: '',
    course: ''
  };
  
  message = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getStudent(this.route.snapshot.params["id"]);
    }
  }

  getStudent(id: string): void {
    this.studentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentStudent = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateStudent(): void {
    this.message = '';

    this.studentService.update(this.currentStudent.id, this.currentStudent)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This student was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteStudent(): void {
    this.studentService.delete(this.currentStudent.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/student']);
        },
        error: (e) => console.error(e)
      });
  }

}
