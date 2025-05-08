import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Request } from './modules/stadistics/core/interfaces/request.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { StadisticsService } from './modules/stadistics/core/services/stadistics.service';
import { StadisticsComponent } from './modules/stadistics/components/stadistics/stadistics.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, StadisticsComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  form: FormGroup;

  constructor( private fb: FormBuilder, private stadisticService: StadisticsService){
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

      this.stadisticService.CalculatStadistics(requestData).subscribe({
        next: response => {
          this.stadisticService.emitResult(response);
        },
        error: err => {
          console.error('Error al obtener estadísticas', err);
        }
      });
    }
  }
}
