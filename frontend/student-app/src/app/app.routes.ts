import { Routes } from '@angular/router';
import { StudentList } from './pages/student-list/student-list';
import { StudentForm } from './pages/student-form/student-form';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full'},
    { path: 'students', component: StudentList},
    { path: 'add', component: StudentForm},
    { path: 'edit/:id', component: StudentForm}
];
