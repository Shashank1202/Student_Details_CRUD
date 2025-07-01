import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student.model';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@Component({
  standalone: true,
  selector: 'app-student-list',
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentList implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'course', 'date-of-birth', 'actions'];

  constructor(private studentService: StudentService, private router: Router){}


  ngOnInit(){
    this.fetchStudents();    
  }

  fetchStudents(){
    this.studentService.getStudents().subscribe(data => {
      this.students= data;
    });
  }

  editStudent(id: number){
    this.router.navigate(['/edit', id]);
  }

  deleteStudent(id: number){
    if(confirm("Are you sure want to delete this student?")){
      this.studentService.deleteStudent(id).subscribe(() =>{
        this.fetchStudents();
      });
    }
  }
}
