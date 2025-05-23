import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritySelectorComponent } from './priority-selector.component';

describe('PrioritySelectorComponent', () => {
  let component: PrioritySelectorComponent;
  let fixture: ComponentFixture<PrioritySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrioritySelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrioritySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
