import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatbarComponent } from './natbar.component';

describe('NatbarComponent', () => {
  let component: NatbarComponent;
  let fixture: ComponentFixture<NatbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
