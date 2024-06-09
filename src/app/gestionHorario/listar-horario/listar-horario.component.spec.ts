import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHorarioComponent } from './listar-horario.component';

describe('ListarHorarioComponent', () => {
  let component: ListarHorarioComponent;
  let fixture: ComponentFixture<ListarHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
