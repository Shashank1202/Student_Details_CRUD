import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student.model';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  standalone: true,
  selector: 'app-student-list',
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentList implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'course', 'dob', 'actions'];

  constructor(private studentService: StudentService, private router: Router, private snackBar: MatSnackBar){}


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
      this.snackBar.open('Student deleted successfully', 'Close', {
        duration: 2000
      });
      this.fetchStudents();
    });
  }
}
}
