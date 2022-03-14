import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MyFormControl } from '../model/myformcontrol';
import { MyFormGroup } from '../model/myFormGroup';

@Injectable({
  providedIn: 'root',
})
export class LoginReactiveService {
  private _myFormGroup!: MyFormGroup;

  private nombreCampos = ['Usuario', 'Contraseña'];
  public nombreControles = ['logUser', 'logPass'];
  private inputType = ['text','password']
  private controles = [
    new MyFormControl('', [
      Validators.required
    ]),
    new MyFormControl(
      '',
      Validators.required
    ),
  ];
  constructor() {
    this._myFormGroup = new MyFormGroup(
      this.nombreCampos,
      this.nombreControles,
      this.controles,
      this.inputType
    );
    this._myFormGroup.insertarValidationMessages(
      'logUser',
      ['required','minlength'],
      ['El usuario es requerido']
    );
    this._myFormGroup.insertarValidationMessages(
      'logPass',
      ['required'],
      ['La contraseña es requerida']
    );
  }
  validateControl(element: string): boolean {
    let resultado =
      this._myFormGroup.getControl(element).dirty &&
      !this._myFormGroup.getControl(element).valid;
    return resultado;
  }
  
  public getErrorMessage(control: string) {
    let algo=this._myFormGroup.getControl(control)
    return algo.getValidationMessages();
  }
  public get myFormGroup(): MyFormGroup {
    return this._myFormGroup;
  }
  public set myFormGroup(value: MyFormGroup) {
    this._myFormGroup = value;
  }
}