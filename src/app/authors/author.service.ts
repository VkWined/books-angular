import { Injectable } from '@angular/core';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Author } from './author';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private firestore: Firestore) { }

  async getAuthors() {
    const authorsCol = collection(this.firestore, 'authors');
    const authorSnapshot = await getDocs(authorsCol);
    const authorList: Author[] = authorSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Author));
    return authorList;
  }

  async getAuthor(id: string) {
    const authorRef = doc(this.firestore, 'authors', id);
    const authorSnapshot = await getDoc(authorRef);
    if (authorSnapshot.exists()) {
      return { id, ...authorSnapshot.data() } as Author;
    } else {
      throw new Error('No author found with the provided id');
    }
  }

  async addAuthor(author: Author) {
    const authorsCol = collection(this.firestore, 'authors');
    const docRef = await addDoc(authorsCol, author as { [x: string]: any; });
    return docRef.id;
  }
  
  async updateAuthor(id: string, author: Author) {
    const authorRef = doc(this.firestore, 'authors', id);
    await updateDoc(authorRef, author as { [x: string]: any; });
  }

  async deleteAuthor(id: string) {
    const authorRef = doc(this.firestore, 'authors', id);
    await deleteDoc(authorRef);
  }
}
