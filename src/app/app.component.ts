import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Request } from './modules/statistics/core/interfaces/request.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsService } from './modules/statistics/core/services/statistics.service';
import { StatisticsComponent } from './modules/statistics/components/statistics/statistics.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, StatisticsComponent],
  standalone: true,
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

  onSubmit() {
    if (this.form.valid) {
      const requestData: Request = {
        lowerLimit: +this.form.value.lowerLimit,
        upperLimit: +this.form.value.upperLimit,
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
}
