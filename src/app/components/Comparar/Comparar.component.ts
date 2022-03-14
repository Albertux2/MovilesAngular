import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CompareService } from 'src/app/service/compare.service';
import { MovilService } from 'src/app/service/movil.service';
import { Movil } from 'src/app/model/movil';

@Component({
  selector: 'app-Comparar',
  templateUrl: './Comparar.component.html',
  styleUrls: ['./Comparar.component.css'],
})
export class CompararComponent implements OnInit {
  private _comparables!: Movil[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private compararService:CompareService) {
    this.comparables = data.comparables;
    setTimeout(() => {
      this.compararService.addMoviles(this.comparables);
    }, 100);
  }

  ngOnInit() {
  }

  public get comparables(): Movil[] {
    return this._comparables;
  }
  public set comparables(value: Movil[]) {
    this._comparables = value;
  }
}
