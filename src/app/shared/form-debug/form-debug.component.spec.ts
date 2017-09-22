/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormDebugComponent } from './form-debug.component';

describe('FormDebugComponent', () => {
  let component: FormDebugComponent;
  let fixture: ComponentFixture<FormDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDebugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
