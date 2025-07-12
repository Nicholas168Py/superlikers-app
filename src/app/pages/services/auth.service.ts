import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost/superlikers-api/mock-login.php';

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        return this.http.post(this.apiUrl, credentials).pipe(
            tap((resp: any) => {
                if (resp.ok === 'true') {
                    localStorage.setItem('token', resp.token);
                    localStorage.setItem('distinct_id', resp.participant['codigo-de-cliente']);
                }
            })
        );
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getDistinctId(): string | null {
        return localStorage.getItem('distinct_id');
    }

    logout() {
        localStorage.clear();
    }
}