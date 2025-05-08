import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Request } from './modules/statistics/core/interfaces/request.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsService } from './modules/statistics/core/services/statistics.service';
import { StatisticsComponent } from './modules/statistics/components/statistics/statistics.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, StatisticsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  form: FormGroup;

  constructor( private fb: FormBuilder, private statisticservice: StatisticsService){
    this.form = this.fb.group({
      lowerLimit: ['', Validators.required],
      upperLimit: ['', Validators.required],
      values: ['', Validators.required]
    });
  }

  onClear(): void {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {

      if (this.form.value.upperLimit < this.form.value.lowerLimit) {
        this.form.setErrors({ upperLessThanLower: true });
        return;
      }

      const requestData: Request = {
        lowerLimit: this.form.value.lowerLimit,
        upperLimit: this.form.value.upperLimit,
        values: this.form.value.values.split(',').map(Number)
      };

      this.statisticservice.Calculatstatistics(requestData).subscribe({
        next: response => {
          this.statisticservice.emitResult(response);
        },
        error: err => {
          console.error('Error al obtener estadísticas', err);
        }
      });
    }
  }

  upperGreaterThanLower(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const lower = Number(group.get('lowerLimit')?.value);
      const upper = Number(group.get('upperLimit')?.value);

      if (lower !== null && upper !== null && upper < lower) {
        return { upperLessThanLower: true };
      }

      return null;
    };
  }
}
