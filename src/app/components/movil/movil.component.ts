import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MovilService } from 'src/app/service/movil.service';
import { Movil } from '../../model/movil';
import { CompararComponent } from '../Comparar/Comparar.component';
import { MatDialog } from '@angular/material/dialog';
import { CompareService } from 'src/app/service/compare.service';
import { CustomResponse } from 'src/app/model/CustomResponse';
import { FilterService } from 'src/app/service/filter.service';
import { UserAuthenticationService } from 'src/app/service/UserAuthentication.service';

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
  private _search: string = '';

  moviles: Movil[] = [];
  constructor(
    private dialog: MatDialog,
    private movilService: MovilService,
    private compareService: CompareService,
    private filterService:FilterService,
    private authService:UserAuthenticationService
  ) {
    this.changeFiltered();
    this.getServiceMobiles();
    this.getMobiles();
  }

  ngOnInit() {}

  getMobiles(page?: number) {
    this.filtered = false;
    let pageBase = 0;
    if (page != null) {
      pageBase = page;
    }
    this.movilService.getMobiles(pageBase);
  }

  public getSearch(value: string, page?: number) {
    this.filtered = false;
    this._search = value;
    let pageBase = 0;
    if (page != null) {
      pageBase = page;
    }
    if (this.search.length > 0) {
      this.movilService.getMobilesBySearch(this.search, pageBase);
    } else {
      this.getMobiles(pageBase);
    }
  }

  public onCardClick(event: Event) {
    let clickedElement: HTMLElement = event.target as HTMLElement;
    if (this.compareService.comparable && this.isCard(clickedElement)) {
      let clickedId: number = parseInt(clickedElement.id);
      if (this.checkIfIdIsRepeated(clickedId)) {
        this.comparableId.splice(this.comparableId.indexOf(clickedId), 1);
        clickedElement.classList.remove('comparable');
      } else {
        this.pushIdToComparable(clickedId);
        clickedElement.classList.add('comparable');
      }
      if (this.comparableId.length == 2) {
        this.showDialog();
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
      this.getSearch(this.search, this.pageNumber);
    }
  }

  public showDialog() {
    this.movilService
      .getMobilesByIdList(this.comparableId)
      .subscribe((moviles: Movil[]) => {
        this.dialog.open(CompararComponent, {
          width: '80vw',
          height: '80vh',
          data: {
            comparables: moviles,
          },
        });
        this.clearComparableArray();
      },(err) => {
        this.authService.refresh(err, () => {
          this.showDialog();
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

  public getServiceMobiles(){
    this.movilService.mobileList$.asObservable().subscribe((response:CustomResponse)=>{
      this.moviles = response.data.moviles.content;
      this.pageNumber = response.data.moviles.pageable.pageNumber;
      this.totalElementsPage = response.data.moviles.totalElements;
    });
  }

  public checkIfIdIsRepeated(id: number): boolean {
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
  public get search(): string {
    return this._search;
  }
  public set search(value: string) {
    this._search = value;
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
