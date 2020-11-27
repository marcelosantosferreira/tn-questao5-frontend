
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
      {},
      {},
      {}
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

  it('should have a title Veiculos', () => {
    expect(fixture.componentInstance.title).toEqual('Veículos');
  });

  it('should have a p element', () => {
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Veículos');
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

    let trCollection = fixture.debugElement.queryAll(By.css('tr'));
    expect(trCollection.length).toBe(3);
  });

});
