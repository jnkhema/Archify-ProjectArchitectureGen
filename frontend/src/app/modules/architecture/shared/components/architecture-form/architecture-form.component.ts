import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchitectureService } from '../../../services/architecture.services';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ArchitectureStateService } from '../../../services/architecture-state.service';

@Component({
  selector: 'app-architecture-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './architecture-form.component.html',
  styleUrl: './architecture-form.component.css'
})
export class ArchitectureFormComponent implements OnInit , OnDestroy{
   projectId: number = 0;
   projectTitle: string = '';
   projectDescription: string = '';
   architectureLevel: string = '';
   prompt: string = '';

    isLoading: boolean = false;
    isSaving: boolean = false;
    errorMessage: string = '';
    private routeSub: Subscription = new Subscription();

    constructor(private router: Router, private route: ActivatedRoute, private architectureService: ArchitectureService , private architectureStateService: ArchitectureStateService) {}

    ngOnInit() {
      this.routeSub = this.route.params.subscribe(params => {
        const id = params['id'];
      if (id) {
        this.projectId = parseInt(id); // Clear previous project ID
        this.errorMessage = ''; // Clear previous error messages
        this.loadProject(this.projectId);
      }
    });
    }

    ngOnDestroy(): void {
      this.routeSub.unsubscribe();
    }
     
    loadProject(id: number) {
      this.isLoading = true;
      this.architectureService.getById(id).subscribe({
        next: (response) => {
          this.projectTitle = response.projectTitle;
          this.projectDescription = response.projectDescription;
          this.architectureLevel = response.architectureLevel;
          this.prompt = response.prompt;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Error loading project';
          console.error('Error loading project', err);
          this.isLoading = false;
        }
      });
    }

    onUpdate() {
      if(!this.projectTitle || !this.projectDescription || !this.architectureLevel || !this.prompt) {
        this.errorMessage = 'All fields are required.';
        return;
      }

      this.isSaving = true;
      this.errorMessage = '';
      const request = {
        projectTitle: this.projectTitle,
        projectDescription: this.projectDescription,
        architectureLevel: this.architectureLevel,
        prompt: this.prompt
      };

      this.architectureService.update(this.projectId, request).subscribe({
        next: () => {
          this.isSaving = false;
          this.architectureStateService.triggerRefresh(); // Notify list to refresh
          this.router.navigate(['/layout/architecture/detail', this.projectId]);
        },
        error: (err) => {
          console.error('Error updating project', err);
          this.errorMessage = 'Failed to update project. Please try again.';
          this.isSaving = false;
        }
      });
    }

    goBack() {
      this.router.navigate(['/layout/architecture/detail', this.projectId]);
    } 
}

