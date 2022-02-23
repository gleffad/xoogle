import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { faGlobe,faFileZipper,faFileImage,faBook,faFileInvoice } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  // icons:
  faGlobe = faGlobe;
  faFileZipper = faFileZipper;
  faFileImage = faFileImage;
  faBook = faBook;
  faFileInvoice = faFileInvoice;

  // objects

  livreId: number = 0;
  similaire: boolean = true;
  auteur: Auteur = {
    nom : '',
    birth: null,
    death: null
  }

  format:Formats = {
    txt: '',
    ebook:'',
    epub:'',
    rdf_xml:'',
    zip:'',
    html:'',
    url_livre:'',
    image:''

  }

  book: Book = {
    titre: "",
    auteurs: [this.auteur],
    themes: null,
    languages:null,
    copyright: false,
    format: this.format,
    download: 0
  };

  livres = [1,2,3];
  
  constructor(private route: ActivatedRoute,private bookService: BookServiceService) {
    this.route.params.subscribe(params => {
      this.livreId = params['id'];
      // appel API ici ...
      this.bookService.search_book(this.livreId).subscribe(
        (data:any) => {
          this.book.titre = data['title'];
          data['authors'].forEach((author:any) =>{
            this.auteur.nom = author.name;
            this.auteur.birth = author.birth_year;
            this.auteur.death= author.death_year;
            this.book.auteurs.push(this.auteur);
          })
          this.book.auteurs = data['authors'];
          this.book.themes = data['subjects'];
          this.book.languages = data['languages'];
          this.book.copyright = data['copyright'];
          this.book.download = data['download_count'];
          this.format.txt = data['formats']['text/html; charset=utf-8'];
          this.format.ebook = data['formats']['application/x-mobipocket-ebook'];
          this.format.epub = data['formats']['application/epub+zip'];
          this.format.rdf_xml = data['formats']['application/rdf+xml'];
          this.format.zip = data['formats']['application/zip'];
          this.format.html = data['formats']['text/html'];
          this.format.url_livre = data['formats']['text/plain; charset=utf-8'];
          this.format.image = data['formats']['image/jpeg'];

          this.book.format = this.format;
        },
        (error) => {
          console.error("Nous avons rencontre l'erreur suivante : " + error.message);
        }

      );

    });
  }

  ngOnInit(): void {
  }

}
type Book = {
  titre: string
  auteurs: Auteur[],
  themes: string[] | null,
  languages:string[] | null,
  copyright: boolean,
  format: Formats
  download:number
};

type Auteur = {
  nom: string,
  birth:number | null,
  death:number | null
};

type Formats = {
  txt?: string,
  ebook?:string,
  epub?:string,
  rdf_xml?:string,
  zip:string | null,
  html?:string | null,
  url_livre?:string | null,
  image?:string | null
};