import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProgramacionUsuarioComponent } from './listar-programacion-usuario.component';

describe('ListarProgramacionUsuarioComponent', () => {
  let component: ListarProgramacionUsuarioComponent;
  let fixture: ComponentFixture<ListarProgramacionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProgramacionUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarProgramacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
