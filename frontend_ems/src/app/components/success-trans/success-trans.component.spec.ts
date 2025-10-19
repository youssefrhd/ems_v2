import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTransComponent } from './success-trans.component';

describe('SuccessTransComponent', () => {
  let component: SuccessTransComponent;
  let fixture: ComponentFixture<SuccessTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessTransComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
