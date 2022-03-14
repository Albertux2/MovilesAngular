import {
    AbstractControlOptions,
    AsyncValidatorFn,
    FormControl,
    ValidatorFn,
  } from '@angular/forms';
  
  export class MyFormControl extends FormControl {
    validationMessages = new Map<string, string>();
    constructor(
      formState?: any,
      validatorOrOpts?:
        | ValidatorFn
        | ValidatorFn[]
        | AbstractControlOptions
        | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
      super(formState, validatorOrOpts, asyncValidator);
    }
    public insertValidationMessage(error: string, message: string) {
      this.validationMessages.set(error, message);
    }
    private getMessage(key: string) {
      return this.validationMessages.get(key);
    }
    public getErrorNames(): string[] {
      let nombres: string[] = [];
      for (const iterator of this.validationMessages.keys()) {
        if (this.errors?.[iterator]) nombres.push(iterator);
      }
      return nombres;
    }
    public getValidationMessages(): string[] {
      let nombres: string[] = [];
      for (const iterator of this.getErrorNames()) {
        let value = this.getMessage(iterator);
        if (value) nombres.push(value);
      }
      return nombres;
    }
  }