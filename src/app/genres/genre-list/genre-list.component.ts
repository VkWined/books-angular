import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Genre } from '../genre';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<Genre> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private genreService: GenreService) { }

  ngOnInit() {
    this.fetchGenres();
  }

  async fetchGenres() {
    const genres = await this.genreService.getGenres();
    this.dataSource = new MatTableDataSource(genres);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async deleteGenre(id: string) {
    try {
      await this.genreService.deleteGenre(id);
      await this.fetchGenres(); // Refresh the table
    } catch(e) {
      console.error('Error deleting genre: ', e);
    }
  }
}
