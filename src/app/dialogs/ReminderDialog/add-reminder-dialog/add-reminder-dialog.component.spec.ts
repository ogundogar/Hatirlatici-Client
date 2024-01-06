import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReminderDialogComponent } from './add-reminder-dialog.component';

describe('AddReminderDialogComponent', () => {
  let component: AddReminderDialogComponent;
  let fixture: ComponentFixture<AddReminderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReminderDialogComponent]
    });
    fixture = TestBed.createComponent(AddReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
