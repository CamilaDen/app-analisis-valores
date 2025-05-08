import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Response } from '../../core/interfaces/response.interface';
import { StadisticsService } from '../../core/services/stadistics.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { bootstrapAppScopedEarlyEventContract } from '@angular/core/primitives/event-dispatch';

declare var bootstrap: any;

@Component({
  selector: 'app-stadistics',
  imports: [ CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './stadistics.component.html',
  styleUrl: './stadistics.component.css'
})
export class StadisticsComponent implements OnInit {
  response?: Response;

  constructor(private statisticsService: StadisticsService) {}

  ngOnInit() {
    this.statisticsService.result$.subscribe(res => {
      this.response = res;
      const modalEl = document.getElementById('resultModal');
      console.log("modal encontrado", modalEl);
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }else{
        console.warn("no se encontro el modal");
      }
    });
  }
}
