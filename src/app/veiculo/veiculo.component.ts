import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IVeiculo } from '../veiculo';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  veiculos: IVeiculo[];
  veiculosNaoVendidos:IVeiculo[];
  quantidadeVeiculosNaoVendidos: number = 0;
  title: string = 'Veículos';

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    /*
    this.ds.getVeiculos().subscribe(
      r => this.veiculos = r,
      e => console.error(e)
    );*/

    this.ds.getVeiculos().subscribe(
      r => this.handleCollection(r),
      e => console.error(e)
    )

    /*
    this.ds.getVeiculosNaoVendidos().subscribe(
      r => this.veiculosNaoVendidos = r,
      e => console.error(e)
    );
    */

  }

  handleCollection(c: IVeiculo[]){

    this.veiculos = c;
    this.veiculosNaoVendidos = c.filter((e,i,a)=>{
      return (e.vendido === false);
    });
    this.quantidadeVeiculosNaoVendidos = this.veiculosNaoVendidos.length;
    console.log(this.quantidadeVeiculosNaoVendidos);
  }
}
