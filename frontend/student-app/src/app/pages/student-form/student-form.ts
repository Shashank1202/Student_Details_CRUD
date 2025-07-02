import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

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
  private snackBar: MatSnackBar,
  private route: ActivatedRoute
  ){}

  ngOnInit() {
  this.studentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    course: ['', Validators.required],
    dob: ['', Validators.required]
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    const studentId = Number(idParam);
    this.studentService.getStudentById(studentId).subscribe(student => {
      // Patch form with existing data
      this.studentForm.patchValue(student);
    });
  }
}


 onSubmit() {
  if (this.studentForm.valid) {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      // 🔁 Edit Mode
      const studentId = Number(idParam);
      this.studentService.updateStudent(studentId, this.studentForm.value).subscribe({
        next: () => {
          this.snackBar.open('Student updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('Failed to update student:', err);
          this.snackBar.open('Update failed. Try again.', 'Close', { duration: 5000 });
        }
      });
    } else {
      // ➕ Add Mode
      this.studentService.addStudent(this.studentForm.value).subscribe({
        next: () => {
          this.snackBar.open('Student added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('Failed to add student:', err);
          this.snackBar.open('Student email already exists. Try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }
 }
}
