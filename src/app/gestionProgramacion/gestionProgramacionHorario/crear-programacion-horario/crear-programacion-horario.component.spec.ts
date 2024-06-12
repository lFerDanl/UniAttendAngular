import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProgramacionHorarioComponent } from './crear-programacion-horario.component';

describe('CrearProgramacionHorarioComponent', () => {
  let component: CrearProgramacionHorarioComponent;
  let fixture: ComponentFixture<CrearProgramacionHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearProgramacionHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearProgramacionHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
