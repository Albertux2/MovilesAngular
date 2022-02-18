import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs/internal/Observable';
import { CompareService } from 'src/app/service/compare.service';
import { MovilService } from 'src/app/service/movil.service';
import { Historico } from 'src/model/Historico';
import { Movil } from 'src/model/movil';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  private historicos:Array<Historico[]> = [];
  private lista$!:Observable<Movil[]>

  constructor(private movilService:MovilService,private compararService:CompareService) {
    
  }
  public legendPosition = LegendPosition.Below

  ngOnInit() {
    this.recogerMoviles();
  }
  private _saleData:any = [];
  public get saleData() {
    return this._saleData;
  }
  public set saleData(value) {
    this._saleData = value;
  }

  private loadSaleData(lista:Movil[]){
    let dataArray=[]
    let values = [];
    let index:number = 0;
    for (const iterator of this.historicos) {
      for (const historico of iterator) {
       let object = {
          value: historico.precio,
          name: historico.fecha.substring(0,10),
        }
        values.push(object);
      }
      let myData = {
        name: lista[index].marca+" "+lista[index].modelo,
        series: values
      }
      dataArray.push(myData);
      values = [];
      index++;
    }
    this._saleData = dataArray;
  }
  
  private recogerMoviles(){
    this.lista$=this.compararService.listaMoviles$.asObservable();
    this.lista$.subscribe((moviles:Movil[])=>{
      this.movilService.getHistoricoPrecios(moviles[0].id).subscribe((historico:Historico[])=>{
        this.historicos.push(historico)
        this.movilService.getHistoricoPrecios(moviles[1].id).subscribe((historico:Historico[])=>{
          this.historicos.push(historico)
          this.loadSaleData(moviles);
        })
      })
    })
  }

}
