import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsDlgComponent } from './attachments-dlg.component';

describe('AttachmentsDlgComponent', () => {
  let component: AttachmentsDlgComponent;
  let fixture: ComponentFixture<AttachmentsDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
