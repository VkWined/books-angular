import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorService } from '../author.service';
import { Author } from '../author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Author>([]);  // assign a default empty value

  authors: Author[] = []; 

  constructor(private authorService: AuthorService) { }

  async ngOnInit() {
    try {
      this.authors = await this.authorService.getAuthors();
      this.dataSource = new MatTableDataSource(this.authors);
    } catch (err) {
      console.log('Error getting authors:', err);
    }
  }

  async onDelete(id: string) {
    try {
      console.log(id); 
      await this.authorService.deleteAuthor(id);
      this.authors = this.authors.filter(author => author.id !== id);
      this.dataSource = new MatTableDataSource(this.authors);
    } catch (err) {
      console.log('Error deleting author:', err);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
