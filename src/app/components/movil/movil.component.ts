import { JsonpClientBackend } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { MovilService } from 'src/app/service/movil.service';
import { Movil } from '../../../model/movil';
import { CompararComponent } from '../Comparar/Comparar.component';
import { MatDialog } from '@angular/material/dialog';
import { CompareService } from 'src/app/service/compare.service';
import { CustomResponse } from 'src/model/CustomResponse';
import { FilterService } from 'src/app/service/filter.service';

@Component({
  selector: 'app-movil',
  templateUrl: './movil.component.html',
  styleUrls: ['./movil.component.css'],
})
export class MovilComponent implements OnInit {
  private _filtered: boolean = false;
  private _comparableId: number[] = [];
  private _pageNumber: number = 0;
  private _totalElementsPage: number = 0;
  private _busqueda: string = '';

  lista!: any;
  moviles: Movil[] = [];
  constructor(
    private dialog: MatDialog,
    private movilService: MovilService,
    private compareService: CompareService,
    private filterService:FilterService
  ) {
    this.changeFiltered();
    this.getFilteredMobiles();
  }

  ngOnInit() {
    this.getMoviles();
  }
  getMoviles(page?: number) {
    this.filtered = false;
    let pageBase = 0;
    if (page != null) {
      pageBase = page;
    }
    this.lista = this.movilService.getMoviles(page);
    this.lista.then((a: CustomResponse) => {
      this.moviles = a.data.moviles.content as Movil[];
      this.pageNumber = a.data.moviles.pageable.pageNumber;
      this.totalElementsPage = a.data.moviles.totalElements;
    });
  }

  public getBusqueda(value: string, page?: number) {
    this.filtered = false;
    this._busqueda = value;
    let pageBase = 0;
    if (page != null) {
      pageBase = page;
    }
    if (this.busqueda.length > 0) {
      this.lista = this.movilService.getMovilesNombre(this.busqueda, pageBase);
      this.lista.then((a: CustomResponse) => {
        this.moviles = a.data.moviles.content as Movil[];
        this.pageNumber = a.data.moviles.pageable.pageNumber;
        this.totalElementsPage = a.data.moviles.totalElements;
      });
    } else {
      this.getMoviles(pageBase);
    }
  }

  public onCardClick(event: Event) {
    let clickedElement: HTMLElement = event.target as HTMLElement;
    if (this.compareService.comparable && this.isCard(clickedElement)) {
      let clickedId: number = parseInt(clickedElement.id);
      if (this.comprobarIdRepetida(clickedId)) {
        this.comparableId.splice(this.comparableId.indexOf(clickedId), 1);
        clickedElement.classList.remove('comparable');
      } else {
        this.pushIdToComparable(clickedId);
        clickedElement.classList.add('comparable');
      }
      if (this.comparableId.length == 2) {
        this.showDialog();
        this.clearComparableArray();
      }
    }
  }

  public clearComparableArray() {
    for (const id of this.comparableId) {
      let element: HTMLElement = document.getElementById(
        id.toString()
      ) as HTMLElement;
      element.classList.remove('comparable');
    }
    this.comparableId = [];
  }

  public isCard(element: HTMLElement): boolean {
    return element.classList.contains('cardC');
  }

  public changePage(event: any) {
    if (event.pageIndex > this.pageNumber) {
      this.pageNumber++;
    } else {
      this.pageNumber--;
    }
    if(this.filtered){
      this.movilService.getFilteredMobiles(this.pageNumber)      
    }else{
      this.getBusqueda(this.busqueda, this.pageNumber);
    }
  }

  public showDialog() {
    this.movilService
      .getMovilesByIdList(this.comparableId)
      .subscribe((moviles: Movil[]) => {
        this.dialog.open(CompararComponent, {
          width: '80vw',
          height: '80vh',
          data: {
            comparables: moviles,
          },
        });
      });
  }

  public pushIdToComparable(id: number) {
    if (this.comparableId.length < 2) {
      this.comparableId.push(id);
    } else {
      this.comparableId.splice(1, 1, id);
    }
  }

  public changeFiltered(){
    this.filterService.searchFiltered$.asObservable().subscribe((b:boolean)=>{
      this.filtered = b;
    })
  }

  public getFilteredMobiles(){
    this.movilService.listaFiltrados$.asObservable().subscribe((response:CustomResponse)=>{
      this.moviles = response.data.moviles.content;
      this.pageNumber = response.data.moviles.pageable.pageNumber;
      this.totalElementsPage = response.data.moviles.totalElements;
    });
  }

  public comprobarIdRepetida(id: number): boolean {
    return this.comparableId.includes(id);
  }

  public get comparableId(): number[] {
    return this._comparableId;
  }
  public set comparableId(value: number[]) {
    this._comparableId = value;
  }

  public get totalElementsPage(): number {
    return this._totalElementsPage;
  }
  public set totalElementsPage(value: number) {
    this._totalElementsPage = value;
  }
  public get busqueda(): string {
    return this._busqueda;
  }
  public set busqueda(value: string) {
    this._busqueda = value;
  }
  public get filtered(): boolean {
    return this._filtered;
  }
  public set filtered(value: boolean) {
    this._filtered = value;
  }
  public get pageNumber(): number {
    return this._pageNumber;
  }
  public set pageNumber(value: number) {
    this._pageNumber = value;
  }
}
