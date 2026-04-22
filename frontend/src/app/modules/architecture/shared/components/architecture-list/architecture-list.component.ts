import { Component , OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ArchitectureService } from '../../../services/architecture.services';
import { CommonModule } from '@angular/common';
import { ProjectArchitectureList } from '../../../models/architecture.model';
import { ArchitectureStateService } from '../../../services/architecture-state.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-architecture-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './architecture-list.component.html',
  styleUrl: './architecture-list.component.css'
})
export class ArchitectureListComponent implements OnInit, OnDestroy {
  projects: ProjectArchitectureList[] = [];
  isLoading: boolean = false;
  private refreshSub: Subscription = new Subscription();
  constructor(private architectureService: ArchitectureService, 
    private router: Router, private architectureStateService: ArchitectureStateService) {}
  
  ngOnInit() {
    this.loadProjects();

    this.refreshSub = this.architectureStateService.architectureUpdated$.subscribe(() => {
      this.loadProjects();
    });
  }

  ngOnDestroy(): void {
    this.refreshSub.unsubscribe();
  }

  loadProjects() {
    this.isLoading = true;
    this.architectureService.getMyProjects().subscribe({
      next: (response : ProjectArchitectureList[]) => {
        this.projects = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading projects', err);
        this.isLoading = false;
      }

    });
  }

  viewProject(id: number) {
    this.router.navigate(['/layout/architecture/detail', id]);
  }

  editProject(id: number) {
    this.router.navigate(['/layout/architecture/edit', id]);
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.architectureService.delete(id).subscribe({
        next: () => {
          this.loadProjects();
        },
        error: (err) => {
          console.error('Error deleting project', err);
        }
      });
    } 
  }
}
