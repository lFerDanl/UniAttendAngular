import { TestBed } from '@angular/core/testing';

import { ProgramacionHorariosService } from './programacion-horarios.service';

describe('ProgramacionHorariosService', () => {
  let service: ProgramacionHorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramacionHorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
