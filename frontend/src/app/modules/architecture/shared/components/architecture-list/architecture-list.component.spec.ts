import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureListComponent } from './architecture-list.component';

describe('ArchitectureListComponent', () => {
  let component: ArchitectureListComponent;
  let fixture: ComponentFixture<ArchitectureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitectureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
