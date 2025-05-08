import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Response } from '../../core/interfaces/response.interface';
import { StatisticsService } from '../../core/services/statistics.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { bootstrapAppScopedEarlyEventContract } from '@angular/core/primitives/event-dispatch';

declare var bootstrap: any;

@Component({
  selector: 'app-statistics',
  imports: [ CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  response?: Response;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.statisticsService.result$.subscribe(res => {
      this.response = res;
      const modalEl = document.getElementById('resultModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }
    });
  }
}
