import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLicenciaUsuarioComponent } from './listar-licencia-usuario.component';

describe('ListarLicenciaUsuarioComponent', () => {
  let component: ListarLicenciaUsuarioComponent;
  let fixture: ComponentFixture<ListarLicenciaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarLicenciaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarLicenciaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
