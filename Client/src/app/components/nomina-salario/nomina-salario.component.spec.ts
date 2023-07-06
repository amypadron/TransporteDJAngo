import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominaSalarioComponent } from './nomina-salario.component';

describe('NominaSalarioComponent', () => {
  let component: NominaSalarioComponent;
  let fixture: ComponentFixture<NominaSalarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominaSalarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominaSalarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
