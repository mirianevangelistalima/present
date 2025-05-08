import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorAmorComponent } from './contador-amor.component';

describe('ContadorAmorComponent', () => {
  let component: ContadorAmorComponent;
  let fixture: ComponentFixture<ContadorAmorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorAmorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorAmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
