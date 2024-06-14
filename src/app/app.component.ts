import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from './navegacion/nav/nav.component';
import { FooterComponent } from './navegacion/footer/footer.component';
import { expandSidebar, highlightSidebarItem } from './sidebar-functions';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/gestionUsuarios/users.service';
import { LoginComponent } from './autenticacion/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, CommonModule, LoginComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'UniAttendWeb';
  constructor(private readonly userService: UsersService){}
  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }

  logout():void{
    this.userService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }

  expandSidebar() {
      expandSidebar();
  }

  highlightItem(event: MouseEvent) {
      const element = event.currentTarget as HTMLElement;
      highlightSidebarItem(element);
  }

  onLogin(): void {
    this.isAuthenticated = true;
  }
}
