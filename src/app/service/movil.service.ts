import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movil } from 'src/model/movil';
import { Observable, Subject } from 'rxjs';
import { Historico } from 'src/model/Historico';
import { Filter } from 'src/model/Filter';
import { CustomResponse } from 'src/model/CustomResponse';

@Injectable({
  providedIn: 'root',
})
export class MovilService {
  private _filter!: Filter;
  private readonly apiUrl = 'http://localhost:8080';
  private _listaFiltrados$!: Subject<CustomResponse>;
  
  constructor(private _http: HttpClient) {
    this._listaFiltrados$ = new Subject();
  }

  async getMoviles(page?: number) {
    let pageBase: number = 0;
    if (page != null) {
      pageBase = page;
    }
    let lista: any;
    await this._http
    .get(this.apiUrl + '/moviles/moviles?page=' + pageBase)
    .forEach((stud) => {
      lista = stud;
    });
    return lista;
  }

  async getMovilesNombre(value: string, page?: number) {
    let pageBase = 0;
    if (page != null) {
      pageBase = page;
    }
    let lista: any;
    await this._http
    .get(this.apiUrl + '/moviles/nombre?value=' + value + '&page=' + pageBase)
    .forEach((stud) => {
        lista = stud;
      });
    return lista;
  }
  
  getMovilesByIdList(ids: number[]): Observable<Movil[]> {
    let moviles$ = <Observable<Movil[]>>(
      this.http.get<Movil[]>(
        this.apiUrl + '/moviles/idList?ids=' + ids.toString()
      )
      );
      return moviles$;
    }

    getHistoricoPrecios(id: number): Observable<Historico[]> {
      let historicos$ = <Observable<Historico[]>>(
      this.http.get<Historico[]>(
        this.apiUrl + '/moviles/historico?id=' + id.toString()
      )
      );
      return historicos$;
    }
  
    getFilteredMobiles(page?: number,value?:string) {
      let pageBase = 0;
    if (page != null) {
      pageBase = page;
    }
    let searchValue:String = new String()
    if(value!=null){
      searchValue = value;
    }
    let body = JSON.parse(JSON.stringify(this.filter))
    this.http.post<CustomResponse>(this.apiUrl + '/moviles/filter?page='+pageBase+'&value='+searchValue,body)
    .subscribe((response:CustomResponse)=>{
      this._listaFiltrados$.next(response);
    })
  }
  
  protected get http(): HttpClient {
    return this._http;
  }
  protected set http(value: HttpClient) {
    this._http = value;
  }
  public get filter(): Filter {
    return this._filter;
  }
  public set filter(value: Filter) {
    this._filter = value;
  }
  public get listaFiltrados$(): Subject<CustomResponse> {
    return this._listaFiltrados$;
  }
  public set listaFiltrados$(value: Subject<CustomResponse>) {
    this._listaFiltrados$ = value;
  }
}
