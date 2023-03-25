import {Component, Input, Output, forwardRef, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Injector, Inject, OnInit, AfterViewInit, Optional, Self, DoCheck} from '@angular/core';
import {NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, NgControl, AbstractControl, FormControl, Validator} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {map, Observable, tap} from "rxjs";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormElementComponent),
  multi: true
};

export const CUSTOM_INPUT_CONTROL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => FormElementComponent),
  multi: true
};

@Component({
  selector: 'form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALIDATOR]
})

export class FormElementComponent implements ControlValueAccessor, OnInit, Validator, AfterViewInit {
  @Input() type:string = 'text'; // text, email, number, tel, textarea, select, date
  @Input() label:string = '';

  // default attributes
  @Input() id:string = '';
  @Input() placeholder:string = '';
  @Input() disabled:boolean = false;
  @Input() readonly:boolean = false;
  @Input() required:boolean = false;
  @Input() maxlength:string|number = 0;
  @Input() minlength:string|number = 0;
  @Input() max:string|number = 0;
  @Input() min:string|number = 0;

  // default actions
  @Output() selectChanged = new EventEmitter();
  @Output() modelChanged = new EventEmitter();
  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() keyUp = new EventEmitter();
  @Output() keyDown = new EventEmitter();
  @Output() click = new EventEmitter();

  // extra parameters
  @Input() selectList:any = [];
  @Input() selectLabel:string = 'name';
  @Input() selectValue:string = 'id';
  @Input() selectAutoDisplayFirst:boolean = false;
  @Input() textareaRows:string|number = 5;
  @Input() dateFormat:string = 'mm/dd/yy';
  @Input() imagePreview:boolean = false;
  @Input() imageSrc:string = '';
  @Input() fileExtensions:string = '*';
  @Input() optional:boolean = false;

  // styles
  @Input() classDiv:string = '';
  @Input() classLabel:string = '';
  @Input() classInput:string = '';
  @Input() classImage:string = '';

  // from formControlName getter/setter and validations
  value:string = '';
  validators:Array<any> = [];

  public dirty:boolean = false;
  public touched:boolean = false;

  public control:any;
  public nameOfForm: string = '';
  public inputName?: string;
  public translateParams: any;
  public translateBaseParams: any;

  public document:any;

  constructor(private injector: Injector, public ref: ChangeDetectorRef, public translate: TranslateService) {
  }

  ngOnInit() {
    this.document = this.injector.get(DOCUMENT);
    this.control = this.injector.get(NgControl);
    this.control.valueAccessor = this;

    if (!this.inputName) {
      this.inputName = this.control.name;
    }

    if (!this.id) {
      this.id = this.control.name;
    }

    this.translateBaseParams = {
      label: this.label,
      maxlength: this.maxlength,
      minlength: this.minlength,
      max: this.max,
      min: this.min,
      id: this.id,
      placeholder: this.placeholder,
    };
  }

  ngAfterViewInit() {
    let itControl = this.document.getElementById('fi_'+this.id);
    if (itControl && this.nameOfForm == '') {
      if (itControl.closest('form').name !== '') {
        this.nameOfForm = itControl.closest('form').name;
      } else if(itControl.closest('form').id !== '') {
        this.nameOfForm = itControl.closest('form').id;
      }
      this.ref.detectChanges();
    }
  }

  controlDetectErrors():void {
    if (this.control.errors !== null) {
      this.validators = Object.keys(this.control.errors);
      let extraParams:any = {};
      this.validators.forEach((item:any) => {
        if (typeof this.control.errors[item] !== "object") {
          extraParams[item] = this.control.errors[item];
        } else {
          Object.keys(this.control.errors[item]).forEach(key => {
            extraParams[key] = this.control.errors[item][key];
          });
        }
      });
      this.translateParams = {...this.translateBaseParams, ...extraParams};
      this.ref.detectChanges();
    }
  }

  writeValue(value: any) {
    this.value = value;
    this.ref.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  // Actions Events
  propagateChange = (_: any) => {};
  onTouched: any = () => { };

  onChange: any = () => { };

  onModelChange(value: any) {
    if (this.control.errors) {
      this.controlDetectErrors();
    } else {
      this.validators = [];
    }
    this.modelChanged.emit(value);
  }

  onEventFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  onEventBlur(event: FocusEvent) {
    this.blur.emit(event);
  }

  onEventKeyUp(event: KeyboardEvent) {
    this.keyUp.emit(event);
  }

  onEventKeyDown(event: KeyboardEvent) {
    this.keyDown.emit(event);
  }

  onEventClick(event: MouseEvent) {
    this.click.emit(event);
  }

  onEventChange(event: Event) {
    this.change.emit(event);
  }

  onSelectChanged(event: any) {
    this.propagateChange(event.value);
    this.selectChanged.emit(event.value);
  }

  // VALIDATIONS
  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): {[key: string]: any} | null {
    if(control.errors) {
      this.controlDetectErrors();
    } else {
      this.validators = [];
    }
    return null;
  }

  public get invalid(): boolean {
    return (this.control)?(this.control.invalid||false):false;
  }

  getTranslateError(validator: string | undefined, haveForm: boolean = true, haveField: boolean = true):Observable<any> {
    return this.translate.get('ERROR.FORM.'+((haveForm)?(this.nameOfForm?.toUpperCase()+'.'):'')+((haveField)?(this.inputName?.toUpperCase()+'.'):'')+validator?.toUpperCase(), this.translateParams).pipe(
      map( (objReturn: any) => {
        if(objReturn == 'ERROR.FORM.'+((haveForm)?(this.nameOfForm?.toUpperCase()+'.'):'')+((haveField)?(this.inputName?.toUpperCase()+'.'):'')+validator?.toUpperCase()) {
          objReturn = null;
        }
        return objReturn;
      })
    );
  }
}
