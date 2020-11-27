import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVeiculo } from '../veiculo';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'http://localhost:4000/veiculos/';
  deleteUrl: string;

  constructor(private http: HttpClient) {
  }

  getVeiculos():Observable<IVeiculo[]>{
    return this.http.get<IVeiculo[]>(this.url);
  }

  getVeiculosNaoVendidos():Observable<IVeiculo[]>{
    return this.http.get<IVeiculo[]>('http://localhost:4000/veiculos?vendido=false');
  }

  excluirVeiculo(veiculo: IVeiculo):Observable<IVeiculo>{
    this.deleteUrl = this.url + veiculo._id;
    console.log(this.deleteUrl);
    return this.http.delete<IVeiculo>(this.deleteUrl);
  }
}
