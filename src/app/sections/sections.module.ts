import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementComponent } from './form-element/form-element.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    FormElementComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormElementComponent
  ]
})
export class SectionsModule { }
