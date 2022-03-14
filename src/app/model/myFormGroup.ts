import { FormGroup } from '@angular/forms';
import { MyFormControl } from './myformcontrol';

export class MyFormGroup {

  private _formGroup!: FormGroup;
  constructor(
    private _nameFields: string[],
    private _nameControl: string[],
    private _formControls: MyFormControl[],
    private _inputType: string[]
  ) {
    this.formGroup = new FormGroup({});
    for (let index = 0; index < _nameFields.length; index++) {
      this.formGroup.addControl(_nameControl[index], _formControls[index]);
    }
  }

  public getControl(key: string): MyFormControl {
    let retorno = this.formGroup.get(key);
    return <MyFormControl>retorno;
  }

  public insertarValidationMessages(
    nameControl: string,
    errors: string[],
    messages: string[]
  ) {
    let control = this.getControl(nameControl);
    for (let index = 0; index < errors.length; index++) {
      control.insertValidationMessage(errors[index], messages[index]);
    }
  }
  public getErrorMessage(key: string, position: number): string {
    let respuesta = this.getControl(key);
    return respuesta.errors![position];
  }
  public get formControls(): MyFormControl[] {
    return this._formControls;
  }
  public set formControls(value: MyFormControl[]) {
    this._formControls = value;
  }
  public get nameControl(): string[] {
    return this._nameControl;
  }
  public set nameControl(value: string[]) {
    this._nameControl = value;
  }
  public get nameFields(): string[] {
    return this._nameFields;
  }
  public set nameFields(value: string[]) {
    this._nameFields = value;
  }
  public get formGroup(): FormGroup {
    return this._formGroup;
  }
  public set formGroup(value: FormGroup) {
    this._formGroup = value;
  }
  public get inputType(): string[] {
    return this._inputType;
  }
  public set inputType(value: string[]) {
    this._inputType = value;
  }
}
