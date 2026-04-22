import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureDetailComponent } from './architecture-detail.component';

describe('ArchitectureDetailComponent', () => {
  let component: ArchitectureDetailComponent;
  let fixture: ComponentFixture<ArchitectureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitectureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
