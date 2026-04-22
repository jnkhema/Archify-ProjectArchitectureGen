import { Component } from '@angular/core';
import { ArchitectureService } from '../../../services/architecture.services';
import { Router } from '@angular/router';
import { CreateArchitectureRequest } from '../../../models/architecture.model';
import { ArchitectureResponse } from '../../../models/architecture.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArchitectureStateService } from '../../../services/architecture-state.service';

@Component({
  selector: 'app-create-architecture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-architecture.component.html',
  styleUrl: './create-architecture.component.css'
})
export class CreateArchitectureComponent {
  projectTitle: string = '';
  projectDescription: string = ''
  architectureLevel: string = '';
  prompt: string = ''

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private architectureService: ArchitectureService, private router: Router, private architectureStateService: ArchitectureStateService) {}

  onGenerate() {
    if(!this.projectTitle || !this.projectDescription || !this.architectureLevel || !this.prompt) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request: CreateArchitectureRequest = {
      projectTitle: this.projectTitle,
      projectDescription: this.projectDescription,
      architectureLevel: this.architectureLevel,
      prompt: this.prompt
    };

    this.architectureService.generate(request).subscribe({
      next: (response: ArchitectureResponse) => {
        this.isLoading = false;
        this.architectureStateService.triggerRefresh(); // Notify list to refresh
        this.router.navigate(['/layout/architecture/detail', response.architectureId]);
      },
      error: (err) => {
        console.error('Error generating architecture', err);
        this.errorMessage = 'Failed to generate architecture. Please try again.';
        this.isLoading = false;
      }
    });
  }
  
}
