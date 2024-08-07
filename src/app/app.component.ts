import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { defaultData } from './data';
import { DocumentEditorComponent, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-form';
  @ViewChild(DynamicFormComponent) formDynamic: DynamicFormComponent;
  myForm: FormGroup;
  form: FormGroup;
  obj: any;
  date: any;

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

  @ViewChild('documentEditor', {
    static: true
  }) documentEditor: DocumentEditorContainerComponent;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      addresses: this.fb.array([])
    });

    // Initialize with one address field
    this.addAddress();
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  addAddress() {
    const addressGroup = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.addresses.push(addressGroup);
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.form);
  }

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

  onOpenDocument(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // const reader = new FileReader();
    // reader.onload = () => {
    //   const arrayBuffer = reader.result as ArrayBuffer;
    //   const base64String = this.arrayBufferToBase64(arrayBuffer);
    //   this.documentEditor!.open(base64String);
    // };
    // reader.readAsArrayBuffer(file);
   // this.documentEditor!.open(file);
   this.documentEditor.documentEditor.open(file);
  }

  // Function to convert ArrayBuffer to Base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  patchValue() {
    this.addresses.patchValue([
      {
        "street": "zxczxc",
        "city": "zxczxc",
        "country": "zczxczxc"
      },
      {
        "street": "zxczxc",
        "city": "zxczxc",
        "country": "zczxczxc"
      }
    ]);

  }
  onSubmitValue() {
    console.log(this.obj);
  }

  onChange($event: any) {

  }
}
