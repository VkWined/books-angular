import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';
import { Author } from '../author';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit {
  authorForm: FormGroup;
  authorId: string | null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.authorId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.authorId;

    this.authorForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.isEdit) {
      this.loadAuthorData();
    }
  }

  async ngOnInit(): Promise<void> {
  }

  async loadAuthorData(): Promise<void> {
    if (this.authorId) {
      const author: Author | undefined = await this.authorService.getAuthor(this.authorId);
      if (author) {
        this.authorForm.patchValue(author);
      }
    }
  }

  async onSubmit() {
    if (this.authorForm.valid) {
      try {
        const authorData = this.authorForm.value;
        if (this.isEdit) {
          if (this.authorId) {
            await this.authorService.updateAuthor(this.authorId, authorData);
            console.log('Author updated with ID: ', this.authorId);
          }
        } else {
          const newAuthorId = await this.authorService.addAuthor(authorData);
          console.log('Author created with ID: ', newAuthorId);
        }

        this.router.navigate(['/authors']);
      } catch(e) {
        console.error('Error saving author: ', e);
      }
    }
  }
  
}
