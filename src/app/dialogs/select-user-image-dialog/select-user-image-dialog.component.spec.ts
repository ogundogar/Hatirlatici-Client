import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserImageDialogComponent } from './select-user-image-dialog.component';

describe('SelectUserImageDialogComponent', () => {
  let component: SelectUserImageDialogComponent;
  let fixture: ComponentFixture<SelectUserImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectUserImageDialogComponent]
    });
    fixture = TestBed.createComponent(SelectUserImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
