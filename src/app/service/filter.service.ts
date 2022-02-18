import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _searchFiltered$: Subject<boolean>; 
  constructor() {
    this._searchFiltered$ = new Subject();
   }

   public changeFiltered(filtered:boolean){
     this.searchFiltered$.next(filtered);
   }
  
  public get searchFiltered$(): Subject<boolean> {
    return this._searchFiltered$;
  }
  public set searchFiltered$(value: Subject<boolean>) {
    this._searchFiltered$ = value;
  }
}
