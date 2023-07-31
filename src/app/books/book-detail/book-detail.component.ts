import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent implements OnInit {
  book: any;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }  // inject Router

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.bookService.getBook(id).then((data) => {
        this.book = data;
      });
    }
  }

  editBook() {
    console.log(this.book);
    this.router.navigate(['/books', 'edit', this.book.id]);
}

  
  deleteBook() {
    // Ask for confirmation before deleting the book
    const confirmation = confirm('Are you sure you want to delete this book?');
    if (confirmation) {
      this.bookService.deleteBook(this.book.id)
        .then(() => {
          // Navigate to the book list page after deleting the book
          // This assumes you have a route configured for the book list at '/books'
          this.router.navigate(['/books']);
        })
        .catch((error) => {
          // Handle any errors here
          console.error('Failed to delete book:', error);
        });
    }
  }
}
