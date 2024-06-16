import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLicenciaComponent } from './listar-licencia.component';

describe('ListarLicenciaComponent', () => {
  let component: ListarLicenciaComponent;
  let fixture: ComponentFixture<ListarLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarLicenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
