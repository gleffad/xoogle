import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  livres:any[] = [];
  topic: string = "";
  nom: string = "";
  language: string = "fr";
  topics = ["Humorous stories", "Dogs -- Fiction"]
  languages = [{name: "Francais", lang: 'fr'}, {name: "Anglais", lang:"en"}]

  constructor(private bookService: BookServiceService) { 

  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    console.log(this.nom, this.language, this.topic);

    this.bookService.all_books(10, this.topic, this.language).subscribe(
      (data:any[]) => {
        const livres = data;
        let newLivres: any[] = [];
        let i = 1;
        livres.forEach((livre, key) => {
          if (key >= 3*i) {
            i++;
          }

          if (newLivres[i-1]) {
            newLivres[i-1].push(livre);
          } else {
            newLivres[i-1] = [livre];
          }
        });
        this.livres = newLivres;
      },
      (error) => {
        console.error("Nous avons rencontre l'erreur suivante : " + error.message);
      }
    );
  }

  showAdvancedSearch(){
    $('#advanced').fadeIn();
  }
}
