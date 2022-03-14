import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Movil } from 'src/app/model/movil';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private _listaMoviles!: Movil[];

  private _listaMoviles$!: Subject<Movil[]>;

  constructor() {
    this.listaMoviles$ = new Subject();
  }

  private _comparable: boolean = false;

  public addMoviles(moviles:Movil[]){
    this.listaMoviles = moviles;
    this.listaMoviles$.next(this.listaMoviles);
  }

  public get comparable(): boolean {
    return this._comparable;
  }
  public set comparable(value: boolean) {
    this._comparable = value;
  }

  public get listaMoviles(): Movil[] {
    return this._listaMoviles;
  }
  public set listaMoviles(value: Movil[]) {
    this._listaMoviles = value;
  }
  public get listaMoviles$(): Subject<Movil[]> {
    return this._listaMoviles$;
  }
  public set listaMoviles$(value: Subject<Movil[]>) {
    this._listaMoviles$ = value;
  }
}
