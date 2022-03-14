import { Options } from '@angular-slider/ngx-slider/options';

export class SliderConfig {
  private _options: Options = {
    floor: this.minValue,
    ceil: this.maxValue,
    translate: (value: number): string => {
      return value + this.suffix;
    },
  };

  constructor(
    private suffix: string,
    private _minValue: number,
    private _maxValue: number
  ) {}

  public get maxValue(): number {
    return this._maxValue;
  }
  public set maxValue(value: number) {
    this._maxValue = value;
  }
  public get options(): Options {
    return this._options;
  }
  public set options(value: Options) {
    this._options = value;
  }

  public get minValue(): number {
    return this._minValue;
  }
  public set minValue(value: number) {
    this._minValue = value;
  }
}
