import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss'
})

export class StudentForm implements OnInit{
  studentForm!: FormGroup;
  
  constructor(
  private fb: FormBuilder,
  private studentService: StudentService,
  private router: Router,
  private snackBar: MatSnackBar
  ){}

  ngOnInit(){

    this.studentForm= this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      dob: ['', Validators.required]
    });
      
  }

  onSubmit() {
  console.log('Form submitted', this.studentForm.value);
  if (this.studentForm.valid) {
    this.studentService.addStudent(this.studentForm.value).subscribe({
      next: () => {
        this.snackBar.open('Student added successfully!', 'Close', {
          duration: 3000, // 3 seconds
        });
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error('Failed to add student:', err);
        this.snackBar.open('Failed to add student. Try again.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
}


}