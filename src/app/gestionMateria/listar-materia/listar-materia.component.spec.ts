import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMateriaComponent } from './listar-materia.component';

describe('ListarMateriaComponent', () => {
  let component: ListarMateriaComponent;
  let fixture: ComponentFixture<ListarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
