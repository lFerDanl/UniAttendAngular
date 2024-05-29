import { Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegisterComponent } from './autenticacion/register/register.component';
import { ProfileComponent } from './gestionUsuario/profile/profile.component';
import { UpdateuserComponent } from './gestionUsuario/updateuser/updateuser.component';
import { UserslistComponent } from './gestionUsuario/userslist/userslist.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registre', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'update/:id', component: UpdateuserComponent},
    {path: 'users', component: UserslistComponent},
    {path: '**', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},

];
