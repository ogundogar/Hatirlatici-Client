import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderDiaologComponent } from './reminder-diaolog.component';

describe('ReminderDiaologComponent', () => {
  let component: ReminderDiaologComponent;
  let fixture: ComponentFixture<ReminderDiaologComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderDiaologComponent]
    });
    fixture = TestBed.createComponent(ReminderDiaologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
