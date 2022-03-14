import {Range} from 'src/app/model/Range'
export class Filter {
  constructor(
    private precioRange: Range,
    private ramRange: Range,
    private antutuMin: number
  ) {
    this.precioRange = precioRange;
    this.ramRange = ramRange;
    this.antutuMin = antutuMin;
  }

  public get getPrecioRange(): Range {
    return this.precioRange;
  }

  public get getRamRange(): Range {
    return this.ramRange;
  }

  public get getAntutuMin(): number {
    return this.antutuMin;
  }

  public set setPrecioRange(value: Range) {
    this.precioRange = value;
  }

  public set setRamRange(value: Range) {
    this.ramRange = value;
  }

  public set setAntutuMin(value: number) {
    this.antutuMin = value;
  }
}
