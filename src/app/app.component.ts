import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'project';
  genreList = [
    { 'code':'male', name: 'Male' },
    { 'code':'female', name: 'Female' },
  ];

  protected formData: FormGroup = new FormGroup({});

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit():void {
    this.form();
  }

  private form():void {
    this.formData = this.formBuilder.group({
      status: [''],
      first_name: ['', [Validators.required,Validators.minLength(3),Validators.minLength(50)]],
      last_name: ['', [Validators.required,Validators.minLength(3),Validators.minLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [''],
      age: ['', [Validators.required,Validators.min(18)]],
      file: [''],
      text: [''],
      genre:['', Validators.required],
    });
  }

  submitForm():void {
    if (this.formData.dirty && this.formData.valid) {
      // form valid
    } else {
      Object.keys(this.formData.controls).forEach(key => {
        this.formData.controls[key].markAsDirty();
        this.formData.controls[key].updateValueAndValidity();
      });
    }
  }
}
