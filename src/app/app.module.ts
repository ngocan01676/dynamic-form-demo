import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { DocumentEditorContainerAllModule, DocumentEditorModule } from '@syncfusion/ej2-angular-documenteditor';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { provideAnimations } from '@angular/platform-browser/animations';
registerLocaleData(localeVi);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormModule,
    ReactiveFormsModule,
    FormsModule,
    SpreadsheetAllModule,
    DocumentEditorModule,
    DocumentEditorContainerAllModule,
    NzDatePickerModule,
  ],
  providers: [ { provide: NZ_I18N, useValue: vi_VN },provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
