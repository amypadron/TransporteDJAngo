import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNominaSalarioComponent } from './crear-nomina-salario.component';

describe('CrearNominaSalarioComponent', () => {
  let component: CrearNominaSalarioComponent;
  let fixture: ComponentFixture<CrearNominaSalarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNominaSalarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNominaSalarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
