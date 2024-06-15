import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { DocumentEditorContainerAllModule, DocumentEditorModule } from '@syncfusion/ej2-angular-documenteditor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormModule,
    ReactiveFormsModule,
    SpreadsheetAllModule,
    DocumentEditorModule,
    DocumentEditorContainerAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
