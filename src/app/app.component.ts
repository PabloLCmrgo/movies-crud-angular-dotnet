import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

@Component({
  selector: 'app-root',
   imports: [LayoutComponent],
  template: `<app-layout />`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movies-crud';
}
