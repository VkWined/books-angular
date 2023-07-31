import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'authorId', 'genreId'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks().then((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
