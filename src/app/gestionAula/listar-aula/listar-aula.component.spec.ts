import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAulaComponent } from './listar-aula.component';

describe('ListarAulaComponent', () => {
  let component: ListarAulaComponent;
  let fixture: ComponentFixture<ListarAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
