import { Component, OnInit } from '@angular/core';
import { Obj } from '@popperjs/core';
import { BookServiceService } from 'src/app/services/book-service.service'; 

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  
  livres:any[] = [];
  topic: string = '';
  nom: string = '';
  motRecherche: string = '';
  language: string = "fr";
  topics = ["Humorous stories", "Dogs -- Fiction"];
  languages = [{name: "Francais", lang: 'fr'}, {name: "Anglais", lang:"en"}];

  constructor(private bookService: BookServiceService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    console.log(this.nom, this.language, this.topic);

    this.bookService.all_books(100, this.topic, this.language,this.motRecherche).subscribe(
      (data:any[]) => {
        this.livres = data;
      },
      (error) =>{
        console.error("Nous avons rencontre l'erreur suivante : " + error.message);
      }
    )}


}
