import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsFieldsComponent } from './attachments-fields.component';

describe('AttachmentsFieldsComponent', () => {
  let component: AttachmentsFieldsComponent;
  let fixture: ComponentFixture<AttachmentsFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
