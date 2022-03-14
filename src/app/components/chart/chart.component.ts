import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs/internal/Observable';
import { CompareService } from 'src/app/service/compare.service';
import { MovilService } from 'src/app/service/movil.service';
import { Historico } from 'src/app/model/Historico';
import { Movil } from 'src/app/model/movil';
import { UserAuthenticationService } from 'src/app/service/UserAuthentication.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  private historicos: Array<Historico[]> = [];
  private lista$!: Observable<Movil[]>;

  constructor(
    private movilService: MovilService,
    private compararService: CompareService,
    private authService: UserAuthenticationService
  ) {}
  public legendPosition = LegendPosition.Below;

  ngOnInit() {
    this.recogerMoviles();
  }
  private _saleData: any = [];
  public get saleData() {
    return this._saleData;
  }
  public set saleData(value) {
    this._saleData = value;
  }

  private loadSaleData(lista: Movil[]) {
    let dataArray = [];
    let values = [];
    let index: number = 0;
    for (const iterator of this.historicos) {
      for (const historico of iterator) {
        let object = {
          value: historico.precio,
          name: historico.fecha.substring(0, 10),
        };
        values.push(object);
      }
      let myData = {
        name: lista[index].marca + ' ' + lista[index].modelo,
        series: values,
      };
      dataArray.push(myData);
      values = [];
      index++;
    }
    this._saleData = dataArray;
  }

  private recogerMoviles() {
    this.lista$ = this.compararService.listaMoviles$.asObservable();
    this.lista$.subscribe((moviles: Movil[]) => {
        this.recogerHistoricos(moviles);
    });
  }

  private recogerHistoricos(moviles:Movil[]){
    this.movilService.getPriceHistory(moviles[0].id).subscribe((historico: Historico[]) => {
      this.historicos[0] = historico;
      this.movilService.getPriceHistory(moviles[1].id).subscribe(
        (historico: Historico[]) => {
          this.historicos[1] = historico;
          this.loadSaleData(moviles);
        },
        (err) => {
          this.authService.refresh(err, () => {
            this.recogerHistoricos(this.compararService.listaMoviles);
          });
        }
      );
    },(err) => {
      this.authService.refresh(err, () => {
        this.recogerHistoricos(this.compararService.listaMoviles);
      });
    });
  }
}
