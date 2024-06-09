import { Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegisterComponent } from './autenticacion/register/register.component';
import { ProfileComponent } from './gestionUsuario/profile/profile.component';
import { UpdateuserComponent } from './gestionUsuario/updateuser/updateuser.component';
import { UserslistComponent } from './gestionUsuario/userslist/userslist.component';
import { CrearHorarioComponent } from './gestionHorario/crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './gestionHorario/editar-horario/editar-horario.component';
import { ListarHorarioComponent } from './gestionHorario/listar-horario/listar-horario.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'update/:id', component: UpdateuserComponent},
    {path: 'users', component: UserslistComponent},
    {path: 'crear-horario', component: CrearHorarioComponent },
    {path: 'editar-horario/:id', component: EditarHorarioComponent },
    {path: 'horarios', component: ListarHorarioComponent },
    {path: '**', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];
