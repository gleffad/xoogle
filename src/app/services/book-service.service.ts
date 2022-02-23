import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  urlApi = 'http://localhost:3316/';  // URL de l'API


  constructor(private http: HttpClient) { }

  all_books(limit?:number|50, topic?:string|'', language?:string|''){
    return this.http.get<object[]>(`${this.urlApi}books/?limit=${limit}&topic=${topic}&language=${language}`)
  }

  search_book(id: number): Observable<object[]> {
    return this.http.get<object[]>(this.urlApi + 'book/detail/' + id);
  }

  // list_theme(){
  //   let books = this.all_books();
  //   let themes:string[];
  //   books.forEach(livre => {
  //     themes.push(livre.)
  //   })

  //   })
  // }


}
