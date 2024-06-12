import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProgramacionComponent } from './listar-programacion.component';

describe('ListarProgramacionComponent', () => {
  let component: ListarProgramacionComponent;
  let fixture: ComponentFixture<ListarProgramacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProgramacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarProgramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
