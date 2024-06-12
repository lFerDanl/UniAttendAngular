import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProgramacionHorarioComponent } from './editar-programacion-horario.component';

describe('EditarProgramacionHorarioComponent', () => {
  let component: EditarProgramacionHorarioComponent;
  let fixture: ComponentFixture<EditarProgramacionHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProgramacionHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProgramacionHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
