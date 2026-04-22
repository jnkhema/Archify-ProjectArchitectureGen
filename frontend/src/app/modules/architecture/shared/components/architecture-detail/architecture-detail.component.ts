import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArchitectureResponse } from '../../../models/architecture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchitectureService } from '../../../services/architecture.services';
import { CommonModule } from '@angular/common';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-architecture-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './architecture-detail.component.html',
  styleUrl: './architecture-detail.component.css'
})
export class ArchitectureDetailComponent implements OnInit, OnDestroy {
  project: ArchitectureResponse | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, private router: Router, private architectureService: ArchitectureService) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.project = null; // Clear previous project data
        this.errorMessage = ''; // Clear previous error messages
        this.loadProject(parseInt(id));
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  loadProject(id: number){
    this.isLoading = true;
    this.architectureService.getById(id).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading project';
        this.isLoading = false;
        console.error('Error loading project:', error);
      }
    });

  }

  goBack(){
    this.router.navigate(['/layout/architecture/create']);
  }

  formatBlueprint(text: string): string {
    if (!text) return '';
    return text
        .replace(/##\s(.+)/g, '<h5 class="fw-bold mt-4 mb-2">$1</h5>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\*\s(.+)/gm, '<li>$1</li>')
        .replace(/^\+\s(.+)/gm, '<li>$1</li>')
        .replace(/\n/g, '<br>');
}
 
}
