import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <div class="dynamic-field form-input" 
      [formGroup]="group">
      <div>
      <label>{{ config.label }}</label>
      <input
        type="text"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name" />
    </div>
    <label *ngIf="error">Không được để trống trường này</label>
    </div>
  `
})
export class FormInputComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  ngOnInit(): void {
    console.log("group", this.group.get(this.config.name));
  }

  get error(): boolean {
    return this.group.get(this.config.name)?.touched && this.group.get(this.config.name)?.invalid || false;
  }
}
