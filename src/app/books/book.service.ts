import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firestore: Firestore) { }

  async getBooks() {
    const bookSnapshots = await getDocs(collection(this.firestore, 'books'));
    return bookSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Book[];
  }

  async getBook(id: string) {
    const bookSnapshot = await getDoc(doc(this.firestore, 'books', id));
    if (bookSnapshot.exists()) {
      return { id, ...bookSnapshot.data() } as Book;
    } else {
      throw new Error('No book found with the provided id');
    }
  }

  async getAuthors() {
    const authorSnapshots = await getDocs(collection(this.firestore, 'authors'));
    return authorSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  async getGenres() {
    const genreSnapshots = await getDocs(collection(this.firestore, 'genres'));
    return genreSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addBook(book: Partial<Book>) {
    const bookRef = await addDoc(collection(this.firestore, 'books'), book);
    return bookRef.id;
  }

  async updateBook(id: string, book: Partial<Book>) {
    await updateDoc(doc(this.firestore, 'books', id), book);
  }

  async deleteBook(id: string) {
    await deleteDoc(doc(this.firestore, 'books', id));
  }
}
