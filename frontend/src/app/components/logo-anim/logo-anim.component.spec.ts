import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAnimComponent } from './logo-anim.component';

describe('LogoAnimComponent', () => {
  let component: LogoAnimComponent;
  let fixture: ComponentFixture<LogoAnimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoAnimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
