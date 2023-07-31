import { Injectable } from '@angular/core';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Genre } from './genre';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private firestore: Firestore) { }

  async getGenres() {
    const genresCol = collection(this.firestore, 'genres');
    const genreSnapshot = await getDocs(genresCol);
    const genreList: Genre[] = genreSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Genre));
    return genreList;
  }

  async getGenre(id: string) {
    const genreRef = doc(this.firestore, 'genres', id);
    const genreSnapshot = await getDoc(genreRef);
    if (genreSnapshot.exists()) {
      return { id, ...genreSnapshot.data() } as Genre;
    } else {
      throw new Error('No genre found with the provided id');
    }
  }

  async addGenre(genre: Genre) {
    const genresCol = collection(this.firestore, 'genres');
    const docRef = await addDoc(genresCol, genre as { [x: string]: any; });
    return docRef.id;
  }

  async updateGenre(id: string, genre: Genre) {
    const genreRef = doc(this.firestore, 'genres', id);
    await updateDoc(genreRef, genre as { [x: string]: any; });
  }

  async deleteGenre(id: string) {
    const genreRef = doc(this.firestore, 'genres', id);
    await deleteDoc(genreRef);
  }
}
