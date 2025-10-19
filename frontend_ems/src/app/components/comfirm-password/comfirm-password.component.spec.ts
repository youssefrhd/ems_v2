import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmPasswordComponent } from './comfirm-password.component';

describe('ComfirmPasswordComponent', () => {
  let component: ComfirmPasswordComponent;
  let fixture: ComponentFixture<ComfirmPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComfirmPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComfirmPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
