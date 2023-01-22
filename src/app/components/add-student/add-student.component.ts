import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  student:Student=new Student();

  form = new FormGroup(
    {
      name: new FormControl("",[Validators.required,Validators.minLength(3)]),
      course: new FormControl("",[Validators.required,Validators.minLength(3)]),
    }
    );
  submitted = false;

  constructor(private studentService: StudentService) { }

  saveStudent(): void {
    const data = {
      name: this.student.name,
      course: this.student.course
    };

    this.studentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newStudent(): void {
    this.submitted = false;
    this.student = {
      name: '',
      course: ''
    };
  }

}
