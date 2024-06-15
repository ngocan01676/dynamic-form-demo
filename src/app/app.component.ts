import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { defaultData } from './data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-form';
  @ViewChild(DynamicFormComponent) formDynamic: DynamicFormComponent;
  myForm: FormGroup;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];

  
  @ViewChild('spreadSheetInstance')
  spreadSheetInstance: SpreadsheetComponent;
  @ViewChild('spreadsheet') public spreadsheetObj: SpreadsheetComponent;
  aSpreadSheetData: Object[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form group with a form control
    this.myForm = this.fb.group({
      control: new FormControl('')
    });

    // Subscribe to valueChanges with proper type handling
    this.myForm.get('control')?.valueChanges.subscribe(value => {
      console.log('Value changed:', value);
    });

    this.aSpreadSheetData = defaultData();
  }

  ngAfterViewInit() {
    // let previousValid = this.form.valid;
    // this.form.changes.subscribe(() => {
    //   if (this.form.valid !== previousValid) {
    //     previousValid = this.form.valid;
    //     this.form.setDisabled('submit', !previousValid);
    //   }
    // });

    // this.form.setDisabled('submit', true);
    // this.form.setValue('name', 'Todd Motto');
  }

  submit(value: {[name: string]: any}) {
    console.log(this.formDynamic.form);
    this.formDynamic.form.markAllAsTouched();
    // Object.keys(this.formDynamic.form.controls).forEach((key) => {
    //   const control = this.formDynamic.form.get(key) as FormControl;
    //   control.markAllAsTouched();
    //   //control.updateValueAndValidity(); // will work
    // });
  }

  // Method to update value without emitting the event
  updateValueWithoutEmitEvent(newValue: string): void {
    //this.myForm.get('control')?.setValue(newValue, { emitEvent: false });
    this.myForm.get('control')?.setValue(newValue);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    let fileResult = new File([file], "Sample.xlsx"); //convert the blob into file
    //this.spreadsheetObj!.open({ file: file }); // open the file into Spreadsheet
    this.spreadsheetObj.open({ file: fileResult });
  }
}
