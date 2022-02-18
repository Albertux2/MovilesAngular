/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovilComponent } from './movil.component';

describe('MovilComponent', () => {
  let component: MovilComponent;
  let fixture: ComponentFixture<MovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
