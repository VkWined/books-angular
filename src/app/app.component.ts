import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exercise4';
  user$: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
