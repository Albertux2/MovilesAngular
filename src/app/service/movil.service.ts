import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movil } from 'src/app/model/movil';
import { Observable, Subject } from 'rxjs';
import { Historico } from 'src/app/model/Historico';
import { Filter } from 'src/app/model/Filter';
import { CustomResponse } from 'src/app/model/CustomResponse';
import { ResponseToken, UserAuthenticationService } from './UserAuthentication.service';

@Injectable({
  providedIn: 'root',
})
export class MovilService {
  
  private _filter!: Filter;
  private readonly apiUrl = 'http://localhost:8080';
  private _mobileList$!: Subject<CustomResponse>;
  
  constructor(private _http: HttpClient,private authService:UserAuthenticationService) {
    this._mobileList$ = new Subject();
  }

  getMobiles(page?: number) {
    let pageBase: number = 0;
    if (page != null) {
      pageBase = page;
    }
    let lista: any;
    this._http
    .get<CustomResponse>(this.apiUrl + '/moviles/moviles?page=' + pageBase,this.authService.getTokenHeader())
    .subscribe((stud) => {
      this._mobileList$.next(stud);
    },(err) => {
      this.authService.refresh(err, () => {
        this.getMobiles(pageBase);
      });
    })
  }

  getMobilesBySearch(value: string, page?: number) {
    let pageBase = 0;
    if (page != null) {
      pageBase = page;
    }
    this._http
    .get<CustomResponse>(this.apiUrl + '/moviles/nombre?value=' + value + '&page=' + pageBase,this.authService.getTokenHeader())
    .subscribe((stud) => {
        this._mobileList$.next(stud);
      },(err) => {
        this.authService.refresh(err, () => {
          this.getMobilesBySearch(value,pageBase);
        });
      })
  }
  
  getMobilesByIdList(ids: number[]): Observable<Movil[]> {
    let moviles$ = <Observable<Movil[]>>(
      this.http.get<Movil[]>(
        this.apiUrl + '/moviles/idList?ids=' + ids.toString(),this.authService.getTokenHeader()
      )
      );
      return moviles$;
    }

    getPriceHistory(id: number): Observable<Historico[]> {
      let historicos$ = <Observable<Historico[]>>(
      this.http.get<Historico[]>(
        this.apiUrl + '/moviles/historico?id=' + id.toString(),this.authService.getTokenHeader()
      )
      );
      return historicos$;
    }
  
    getFilteredMobiles(page?: number,value?:string) {
      let pageBase = 0;
    if (page != null) {
      pageBase = page;
    }
    let searchValue:string = ""
    if(value!=null){
      searchValue = value;
    }
    let body = JSON.parse(JSON.stringify(this.filter))
    this.http.post<CustomResponse>(`${this.apiUrl}/moviles/filter?page=${pageBase}&value=${searchValue}`,body,this.authService.getTokenHeader())
    .subscribe((response:CustomResponse)=>{
      this._mobileList$.next(response);
    },(err) => {
      this.authService.refresh(err, () => {
        this.getFilteredMobiles(pageBase,searchValue)
      });
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
  public get mobileList$(): Subject<CustomResponse> {
    return this._mobileList$;
  }
  public set mobileList$(value: Subject<CustomResponse>) {
    this._mobileList$ = value;
  }
}
