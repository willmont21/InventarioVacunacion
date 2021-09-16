import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../models/user";



@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = 'http://localhost:3000/usuarios';
    constructor(private http: HttpClient) { }
    

    
    getAll(): Observable<User[]> {
        return this.http.get<any>(this.baseUrl);
    }

    get(id: number): Observable<User> {
        return this.http.get<any>(this.baseUrl + '/' + id);
    }

    create(usuario: User) {
        return this.http.post<any>(this.baseUrl, usuario);
    }

    update(id: number, usuario: User): Observable<User> {
        return this.http.put<any>(this.baseUrl + '/' + id, usuario);
    }
    
    delete(id: number) {
        return this.http.delete<any>(this.baseUrl + '/' + id);
    }
}