import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './book-create.component.html'
})
export class BookCreateComponent implements OnInit {
  bookForm = this.fb.group({
    title: ['', Validators.required],
    authorId: ['', Validators.required],
    genreId: ['', Validators.required],
  });

  authors: any[] = [];
  genres: any[] = [];

  bookId: string | null = null; // Add this line to store id of the book being edited

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute // Import ActivatedRoute
  ) {}

  ngOnInit() {
    this.bookService.getAuthors().then(authors => {
      this.authors = authors;
    });

    this.bookService.getGenres().then(genres => {
      this.genres = genres;
    });

    // Check if in 'Edit' mode
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.bookService.getBook(this.bookId).then(book => {
        // Fill the form with the existing book details
        this.bookForm.setValue({
          title: book.title,
          authorId: book.authorId,
          genreId: book.genreId,
        });
      });
    }
  }

  onCreate() {
    if (this.bookForm.valid) {
      const newBookData = {
        title: this.bookForm.value.title ?? '',
        authorId: this.bookForm.value.authorId ?? '',
        genreId: this.bookForm.value.genreId ?? '',
      };      
      let bookActionPromise: Promise<any>;

      if (this.bookId) {
        // If bookId is available, we're in 'Edit' mode. Update the book.
        bookActionPromise = this.bookService.updateBook(this.bookId, newBookData);
      } else {
        // If bookId is not available, we're in 'Create' mode. Create a new book.
        bookActionPromise = this.bookService.addBook(newBookData);
      }

      bookActionPromise
        .then(() => {
          this.router.navigateByUrl('/books');
        })
        .catch(error => {
          // Handle error here
        });
    }
  }
}
