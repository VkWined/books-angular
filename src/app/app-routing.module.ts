import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorCreateComponent } from './authors/author-create/author-create.component';
import { GenreListComponent } from './genres/genre-list/genre-list.component';
import { GenreCreateComponent } from './genres/genre-create/genre-create.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },
  { path: 'books/create', component: BookCreateComponent, canActivate: [AuthGuard]},
  { path: 'books/edit/:id', component: BookCreateComponent, canActivate: [AuthGuard] }, 
  { path: 'books/:id', component: BookDetailComponent, canActivate: [AuthGuard] },
  { path: 'authors', component: AuthorListComponent, canActivate: [AuthGuard] },
  { path: 'authors/create', component: AuthorCreateComponent, canActivate: [AuthGuard] },
  { path: 'authors/edit/:id', component: AuthorCreateComponent, canActivate: [AuthGuard] },
  { path: 'genres', component: GenreListComponent, canActivate: [AuthGuard] },
  { path: 'genres/create', component: GenreCreateComponent, canActivate: [AuthGuard]},
  { path: 'genres/edit/:id', component: GenreCreateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
