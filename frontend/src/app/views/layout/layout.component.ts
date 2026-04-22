import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArchitectureListComponent } from "../../modules/architecture/shared/components/architecture-list/architecture-list.component";
import { CreateArchitectureComponent } from '../../modules/architecture/shared/components/create-architecture/create-architecture.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ArchitectureListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  userName: string = '';

  constructor(private router: Router) {
    this.userName = localStorage.getItem('userName') || '';
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
 
  goToCreateProject() {
    this.router.navigate(['/layout/architecture/create']);
  }
}
 