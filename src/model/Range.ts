export class Range {
  constructor(private min: number, private max: number) {
      this.max = max;
      this.min = min;
  }

  public get getMin(): number {
    return this.min;
  }
  public get getMax(): number {
    return this.max;
  }
  public set getMin(value: number) {
    this.min = value;
  }

  public set getMax(value: number) {
    this.max = value;
  }
}
