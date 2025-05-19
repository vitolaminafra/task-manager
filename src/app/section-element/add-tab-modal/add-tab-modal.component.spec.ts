import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTabModalComponent } from './add-tab-modal.component';

describe('AddTabModalComponent', () => {
  let component: AddTabModalComponent;
  let fixture: ComponentFixture<AddTabModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTabModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTabModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
