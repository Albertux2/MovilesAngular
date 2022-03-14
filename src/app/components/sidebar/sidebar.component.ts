import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { CompareService } from 'src/app/service/compare.service';
import { FilterService } from 'src/app/service/filter.service';
import { MovilService } from 'src/app/service/movil.service';
import { Filter } from 'src/app/model/Filter';
import { SliderConfig } from 'src/app/model/sliderConfig';
import { Range } from 'src/app/model/Range';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private priceSliderConfig: SliderConfig;
  private ramSliderConfig: SliderConfig;
  private _antutuMin: number = 0;
  constructor(
    private compareService: CompareService,
    private filterService: FilterService,
    private movilService: MovilService
  ) {
    this.priceSliderConfig = new SliderConfig('€', 80, 600);
    this.ramSliderConfig = new SliderConfig('MB', 1024, 9216);
  }

  ngOnInit() {}

  public generateFilter() {
    this.filterService.changeFiltered(true);
    this.movilService.filter = new Filter(
      new Range(this.priceMinValue, this.priceMaxValue),
      new Range(this.ramMinValue, this.ramMaxValue),
      this.antutuMin
    );
    this.movilService.getFilteredMobiles();
  }

  public get comparable(): boolean {
    return this.compareService.comparable;
  }
  public set comparable(value: boolean) {
    this.compareService.comparable = value;
  }

  public get priceMinValue(): number {
    return this.priceSliderConfig.minValue;
  }
  public get priceMaxValue(): number {
    return this.priceSliderConfig.maxValue;
  }
  public get priceOptions(): Options {
    return this.priceSliderConfig.options;
  }

  public set priceMinValue(value: number) {
    this.priceSliderConfig.minValue = value;
  }
  public set priceMaxValue(value: number) {
    this.priceSliderConfig.maxValue = value;
  }

  public get ramMinValue(): number {
    return this.ramSliderConfig.minValue;
  }
  public get ramMaxValue(): number {
    return this.ramSliderConfig.maxValue;
  }
  public get ramOptions(): Options {
    return this.ramSliderConfig.options;
  }

  public set ramMinValue(value: number) {
    this.ramSliderConfig.minValue = value;
  }
  public get antutuMin(): number {
    return this._antutuMin;
  }
  public set antutuMin(value: number) {
    this._antutuMin = value;
  }
  public set ramMaxValue(value: number) {
    this.ramSliderConfig.maxValue = value;
  }
}
