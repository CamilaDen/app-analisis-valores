import { Request } from '../interfaces/request.interface';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Response } from "../interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})

export class StatisticsService{
  private resultSubject = new Subject<Response>();
  result$ = this.resultSubject.asObservable();
  private baseUrl = 'https://localhost:44321/Statistics';
  constructor( private http: HttpClient){ }

  Calculatstatistics(request: Request): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}`, request);
  };

  emitResult(result: Response) {
    this.resultSubject.next(result);
  }
}
