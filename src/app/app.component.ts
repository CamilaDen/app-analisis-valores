import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Request } from './modules/stadistics/core/interfaces/request.interface';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  form: FormGroup;
  constructor( private fb: FormBuilder){
    this.form = this.fb.group({
      limiteInferior: ['', Validators.required],
      limiteSuperior: ['', Validators.required],
      valores: ['', Validators.required]
    });
  }

  onSubmit() {
    const requestData: Request = {
      lowerLimit: this.form.value.lowerLimit,
      upperLimit: this.form.value.upperLimit,
      values: this.form.value.values.split(',').map(Number)
    };

  }
}
