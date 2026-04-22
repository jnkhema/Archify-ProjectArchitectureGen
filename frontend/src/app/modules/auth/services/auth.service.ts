import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequest, RegisterRequest, UserResponse } from "../models/auth.model";
import { environment } from "../../../../environments/environment";
import { request } from "express";
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = `${environment.apiUrl}/Auth`;
    
    constructor(private http: HttpClient) {}
    login(data: LoginRequest): Observable<{user: UserResponse}> {
        return this.http.post<{user: UserResponse}>(`${this.baseUrl}/login`, data);
    }

    register(data: RegisterRequest){
        return this.http.post(`${this.baseUrl}/register`, data, {responseType: 'text'});
    }


    // login(data:any){
    //     return this.http.post<{message: string, user: UserResponse}>(`${environment.apiUrl}/Auth/login`, data);
    // }

    // register(request: RegisterRequest): Observable<UserResponse> {
    //     return this.http.post<UserResponse>(`${environment.apiUrl}/auth/register`, request);
    // }
}