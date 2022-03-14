import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyFormGroup } from 'src/app/model/myFormGroup';
import { UserDTO } from 'src/app/model/UserDTO';
import { LoginReactiveService } from 'src/app/service/LoginReactive.service';
import { RegisterReactiveService } from 'src/app/service/RegisterReactive.service';
import { UserAuthenticationService } from 'src/app/service/UserAuthentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private _loginControlForm!: MyFormGroup;
  private _loginNombreControles!: string[];
  private _registerControlForm!: MyFormGroup;
  private _registerNombreControles!: string[];

  private _userDTO: UserDTO = {
    username: '',
    password: '',
    passwordConfirm: '',
  };
  constructor(
    private _loginForm: LoginReactiveService,
    private authService: UserAuthenticationService,
    private _registerForm: RegisterReactiveService,
  ) {
    this.loginNombreControles = this.loginForm.nombreControles;
    this.loginControlForm = this.loginForm.myFormGroup;
    this.registerControlForm = this.registerForm.myFormGroup;
    this.registerNombreControles = this.registerForm.nombreControles;
  }

  ngOnInit() {}

  login() {
    let username =
      this.loginControlForm.formGroup.value[this.loginNombreControles[0]];
    let password =
      this.loginControlForm.formGroup.value[this.loginNombreControles[1]];
    this.authService.authenticate(username, password);
  }

  signup() {
    this.userDTO = this.registerControlForm.formGroup.value;
    this.authService.register(this.userDTO);
  }

  public get userDTO(): UserDTO {
    return this._userDTO;
  }
  public set userDTO(value: UserDTO) {
    this._userDTO = value;
  }
  public get loginControlForm(): MyFormGroup {
    return this._loginControlForm;
  }
  public set loginControlForm(value: MyFormGroup) {
    this._loginControlForm = value;
  }
  public get loginNombreControles(): string[] {
    return this._loginNombreControles;
  }
  public set loginNombreControles(value: string[]) {
    this._loginNombreControles = value;
  }
  public get loginForm(): LoginReactiveService {
    return this._loginForm;
  }
  public set loginForm(value: LoginReactiveService) {
    this._loginForm = value;
  }
  public get registerControlForm(): MyFormGroup {
    return this._registerControlForm;
  }
  public set registerControlForm(value: MyFormGroup) {
    this._registerControlForm = value;
  }
  public get registerNombreControles(): string[] {
    return this._registerNombreControles;
  }
  public set registerNombreControles(value: string[]) {
    this._registerNombreControles = value;
  }
  public get registerForm(): RegisterReactiveService {
    return this._registerForm;
  }
  public set registerForm(value: RegisterReactiveService) {
    this._registerForm = value;
  }
}
