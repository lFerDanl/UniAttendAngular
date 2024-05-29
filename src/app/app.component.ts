import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './navegacion/nav/nav.component';
import { FooterComponent } from './navegacion/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UniAttendWeb';
}
