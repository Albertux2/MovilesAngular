import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../model/User';
import { UserDTO } from '../model/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  private readonly loginUrl = 'http://localhost:8080/login';
  private readonly registerUrl = 'http://localhost:8080/user/signup';
  private readonly refreshUrl = 'http://localhost:8080/user/refresh';
  private _logged: boolean = false;
  private _user!: User;
  constructor(private http: HttpClient, private router: Router,private snackBar: MatSnackBar
    ) {}

  public getToken(): string {
    return 'Bearer ' + this.user.responseToken.access_token;
  }

  public getTokenHeader() {
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.user.responseToken.access_token,
      }),
    };
    return options;
  }

  authenticate(username: string, password: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
      params: new HttpParams()
        .set('username', username)
        .set('password', password),
      withCredentials: true,
    };
    this.http
      .post<ResponseToken>(this.loginUrl, null, options)
      .subscribe((respond) => {
        let responseToken: ResponseToken = respond;
        this.logged = true;
        this.user = new User(responseToken, username);
        this.router.navigateByUrl('/moviles');
      },err=>{
        this.snackBar.open("Credenciales no encontradas","Cerrar!",{
          duration:5000
        })
      });
  }
  refresh(error:any,reexecuteFunction:Function) {
    let errorMessage: string = error.error[Object.keys(error.error)[0]];
    if (errorMessage.startsWith("The Token has expired on")) {
      console.log("Refresco token")
      let options = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.user.responseToken.refresh_token,
        }),
      };
      this.http
      .get<ResponseToken>(this.refreshUrl, options)
      .subscribe((respond) => {
        this.user.responseToken = respond
        reexecuteFunction();
      });
    }
  }

  register(user: UserDTO) {
    this.http.post<Response>(this.registerUrl, user).subscribe((response) => {
      if (response.message == 'Registrado con exito') {
        this.authenticate(user.username, user.password);
      }else{
        this.snackBar.open(response.message.slice("java.lang.Exception: ".length),"Cerrar!",{
          duration:5000
        })
      }
    });
  }

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }
  public get isLogged(): boolean {
    return this._logged;
  }
  public set logged(value: boolean) {
    this._logged = value;
  }
  public get refresher() {
    return this._refresher;
  }
  public set refresher(value) {
    this._refresher = value;
  }
}

export interface ResponseToken {
  access_token: string;
  refresh_token: string;
}

interface Response {
  message: string;
}
