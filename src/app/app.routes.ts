import { Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegisterComponent } from './autenticacion/register/register.component';
import { ProfileComponent } from './gestionUsuario/profile/profile.component';
import { UpdateuserComponent } from './gestionUsuario/updateuser/updateuser.component';
import { UserslistComponent } from './gestionUsuario/userslist/userslist.component';
import { CrearHorarioComponent } from './gestionHorario/crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './gestionHorario/editar-horario/editar-horario.component';
import { ListarHorarioComponent } from './gestionHorario/listar-horario/listar-horario.component';
import { AleatorioComponent } from './aleatorio/aleatorio.component';
import { CrearMateriaComponent } from './gestionMateria/crear-materia/crear-materia.component';
import { EditarMateriaComponent } from './gestionMateria/editar-materia/editar-materia.component';
import { ListarMateriaComponent } from './gestionMateria/listar-materia/listar-materia.component';
import { CrearGrupoComponent } from './gestionGrupo/crear-grupo/crear-grupo.component';
import { EditarGrupoComponent } from './gestionGrupo/editar-grupo/editar-grupo.component';
import { ListarGrupoComponent } from './gestionGrupo/listar-grupo/listar-grupo.component';
import { CrearFacultadComponent } from './gestionFacultad/crear-facultad/crear-facultad.component';
import { EditarFacultadComponent } from './gestionFacultad/editar-facultad/editar-facultad.component';
import { ListarFacultadComponent } from './gestionFacultad/listar-facultad/listar-facultad.component';
import { CrearCarreraComponent } from './gestionCarrera/crear-carrera/crear-carrera.component';
import { EditarCarreraComponent } from './gestionCarrera/editar-carrera/editar-carrera.component';
import { ListarCarreraComponent } from './gestionCarrera/listar-carrera/listar-carrera.component';
import { CrearModuloComponent } from './gestionModulo/crear-modulo/crear-modulo.component';
import { EditarModuloComponent } from './gestionModulo/editar-modulo/editar-modulo.component';
import { ListarModuloComponent } from './gestionModulo/listar-modulo/listar-modulo.component';
import { CrearAulaComponent } from './gestionAula/crear-aula/crear-aula.component';
import { EditarAulaComponent } from './gestionAula/editar-aula/editar-aula.component';
import { ListarAulaComponent } from './gestionAula/listar-aula/listar-aula.component';
import { CrearProgramacionComponent } from './gestionProgramacion/crear-programacion/crear-programacion.component';
import { EditarProgramacionComponent } from './gestionProgramacion/editar-programacion/editar-programacion.component';
import { ListarProgramacionComponent } from './gestionProgramacion/listar-programacion/listar-programacion.component';
import { CrearProgramacionHorarioComponent } from './gestionProgramacion/gestionProgramacionHorario/crear-programacion-horario/crear-programacion-horario.component';
import { ClasesComponent } from './gestionAsistencia/clases/clases.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'update/:id', component: UpdateuserComponent },
    { path: 'users', component: UserslistComponent },
    { path: 'crear-horario', component: CrearHorarioComponent },
    { path: 'editar-horario/:id', component: EditarHorarioComponent },
    { path: 'horarios', component: ListarHorarioComponent },
    { path: 'crear-materia', component: CrearMateriaComponent }, 
    { path: 'editar-materia/:id', component: EditarMateriaComponent }, 
    { path: 'materias', component: ListarMateriaComponent }, 
    { path: 'crear-grupo', component: CrearGrupoComponent }, 
    { path: 'editar-grupo/:id', component: EditarGrupoComponent }, 
    { path: 'grupos', component: ListarGrupoComponent }, 
    { path: 'crear-facultad', component: CrearFacultadComponent }, 
    { path: 'editar-facultad/:id', component: EditarFacultadComponent }, 
    { path: 'facultades', component: ListarFacultadComponent }, 
    { path: 'crear-carrera', component: CrearCarreraComponent }, 
    { path: 'editar-carrera/:id', component: EditarCarreraComponent }, 
    { path: 'carreras', component: ListarCarreraComponent }, 
    { path: 'crear-modulo', component: CrearModuloComponent }, 
    { path: 'editar-modulo/:id', component: EditarModuloComponent }, 
    { path: 'modulos', component: ListarModuloComponent }, 
    { path: 'crear-aula', component: CrearAulaComponent }, 
    { path: 'editar-aula/:id', component: EditarAulaComponent }, 
    { path: 'aulas', component: ListarAulaComponent }, 
    { path: 'crear-programacion', component: CrearProgramacionComponent }, 
    { path: 'editar-programacion/:id', component: EditarProgramacionComponent }, 
    { path: 'programaciones', component: ListarProgramacionComponent }, 
    { path: 'crear-programacion-horario/:id', component: CrearProgramacionHorarioComponent }, 
    { path: 'editar-programacion-horario/:id', component: EditarProgramacionComponent }, 
    { path: 'asistencias', component: ClasesComponent }, 
    { path: 'aleatorio', component: AleatorioComponent },
    { path: '**', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
