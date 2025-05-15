import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagemNoTempoComponent } from './viagem-no-tempo.component';

describe('ViagemNoTempoComponent', () => {
  let component: ViagemNoTempoComponent;
  let fixture: ComponentFixture<ViagemNoTempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViagemNoTempoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViagemNoTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
