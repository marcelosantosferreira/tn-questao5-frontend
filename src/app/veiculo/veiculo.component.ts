import { Component, OnInit } from '@angular/core';
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
  algumErro: boolean = false;
  mensagemDeErro: string = '';
  exibirInfo: boolean = false;
  mensagemDeExclusao: string = '';

  constructor(private ds: DataService) { }

  ngOnInit(): void {

    this.ds.getVeiculos().subscribe(
      r => this.handleCollection(r),
      e => console.error(e)
    )

    /*
    started with this version; filtered the array later
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

  excluirVeiculo(veiculo: IVeiculo){
    this.ds.excluirVeiculo(veiculo).subscribe(
      {
        next: data => {
            this.exibirInfo = true;
            this.mensagemDeExclusao = 'Veículo ' + veiculo.veiculo + ' - ' + veiculo.marca + ' (ano ' + veiculo.ano.toString() + ') foi excluído com sucesso!';
            //TODO: refresh page (not with window.location); this app needs proper routes
        },
        error: error => {
          this.algumErro = true;
          this.mensagemDeErro = 'Erro ao tentar excluir veículo. ' + error.message;
          console.error(this.mensagemDeErro);
        }
    }
    );
  }
}
