
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { DataService } from '../data/data.service';
import { VeiculoComponent } from './veiculo.component';
import { IVeiculo } from '../veiculo';
import { By } from '@angular/platform-browser';

describe('VeiculoComponent', () => {
  let fixture: ComponentFixture<VeiculoComponent>;
  let mockDataService;
  let fakeVeiculos : IVeiculo[];

  beforeEach(() => {

    fakeVeiculos = [
      {_id: 'ff12376876', veiculo: 'Fiesta', marca: 'Ford', ano: 2010, descricao: 'Itens básicos',
        vendido: false, created: '2010-11-10 09:00:00', updated: '2010-12-21 08:07:54'},
      {_id: 'fk76575685', veiculo: 'Ka', marca: 'Ford', ano: 2010, descricao: 'Itens básicos',
      vendido: false, created: '2010-11-10 09:00:00', updated: '2010-12-21 08:07:54'},
      {_id: 'vg12312312', veiculo: 'Gol', marca: 'Volkswagen', ano: 2010, descricao: 'Itens básicos',
      vendido: false, created: '2010-11-10 09:00:00', updated: '2010-12-21 08:07:54'}
    ]

    mockDataService = jasmine.createSpyObj(['getVeiculos']);

    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ VeiculoComponent ],
      providers: [{provide: DataService, useValue: mockDataService}],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(VeiculoComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have a (h3 - Não-vendidos) element', () => {
    mockDataService.getVeiculos.and.returnValue(of(fakeVeiculos));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h3').textContent).toContain('Não-vendidos');
  });

  it('should have called getVeiculos() once', () => {
    mockDataService.getVeiculos.and.returnValue(of(fakeVeiculos));
    fixture.detectChanges();

    expect(mockDataService.getVeiculos).toHaveBeenCalled();
  });

  it('should set veiculos correctly from the service with 3 items',()=>{
    mockDataService.getVeiculos.and.returnValue(of(fakeVeiculos));
    fixture.detectChanges();

    expect(fixture.componentInstance.veiculos.length).toBe(3);
  });

  it('should create a table row - tr - for each veiculo ',()=>{
    mockDataService.getVeiculos.and.returnValue(of(fakeVeiculos));
    fixture.detectChanges();

    let trCollection = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(trCollection.length).toBe(3);
  });

});
