import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private readonly AUTH_KEY = 'logged_user';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const { password, ...userWithoutPassword } = users[0];
          this.saveUser(userWithoutPassword);
          return userWithoutPassword;
        }
        return null;
      })
    );
  }

  private saveUser(user: any): void {
    sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = sessionStorage.getItem(this.AUTH_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  logout(): void {
    sessionStorage.removeItem(this.AUTH_KEY);
  }
}