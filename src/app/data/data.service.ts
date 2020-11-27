import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVeiculo } from '../veiculo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getVeiculos():Observable<IVeiculo[]>{
    return this.http.get<IVeiculo[]>('http://localhost:4000/veiculos');
  }

  getVeiculosNaoVendidos():Observable<IVeiculo[]>{
    return this.http.get<IVeiculo[]>('http://localhost:4000/veiculos?vendido=false');
  }
}
