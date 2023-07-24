import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownlineDlgComponent } from './downline-dlg.component';

describe('DownlineDlgComponent', () => {
  let component: DownlineDlgComponent;
  let fixture: ComponentFixture<DownlineDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownlineDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownlineDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
