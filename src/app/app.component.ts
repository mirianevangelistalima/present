import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContadorAmorComponent } from './contador-amor/contador-amor.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'present';
}
