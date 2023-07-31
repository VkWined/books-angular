import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenreService } from '../genre.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Genre } from '../genre';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent implements OnInit {
  genreForm: FormGroup;
  genre$: Observable<Genre> = of();
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private genreService: GenreService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.genreForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.genre$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.id = id;
          return this.genreService.getGenre(id);
        }
        return of();
      })
    );
    this.genre$.subscribe(genre => {
      if (genre) {
        this.genreForm.patchValue({
          name: genre.name
        });
      }
    });
  }

  async onSubmit() {
    if (this.genreForm.valid) {
      try {
        if (this.id) {
          await this.genreService.updateGenre(this.id, this.genreForm.value);
          console.log('Genre updated with ID: ', this.id);
        } else {
          const newGenre = this.genreForm.value;
          const genreId = await this.genreService.addGenre(newGenre);
          console.log('Genre created with ID: ', genreId);
        }

        this.router.navigate(['/genres']);
      } catch(e) {
        console.error('Error updating/creating genre: ', e);
      }
    }
  }
}
