import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

import { ArchitectureResponse, CreateArchitectureRequest, ProjectArchitectureList } from "../models/architecture.model";

@Injectable({
    providedIn: 'root'
})
export class ArchitectureService {
    private baseUrl = `${environment.apiUrl}/Architecture`;

    constructor(private http: HttpClient) {}

   generate(request: CreateArchitectureRequest): Observable<ArchitectureResponse> {
    return this.http.post<ArchitectureResponse>(`${this.baseUrl}/generate`, request);
   }

   getMyProjects(): Observable<ProjectArchitectureList[]> {
    return this.http.get<ProjectArchitectureList[]>(`${this.baseUrl}/my-projects`);
   }

   getById(id: number): Observable<ArchitectureResponse> {
    return this.http.get<ArchitectureResponse>(`${this.baseUrl}/${id}`);
   }

   delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
   }

   update(id: number, request: CreateArchitectureRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, request);
   }
}