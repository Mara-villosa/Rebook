import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../shared/services/book-service';


@Component({
  selector: 'app-categoria',
  standalone: true,
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.scss']
})
export class CategoriaComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  categoria: string = '';
  libros: any[] = [];
  allBooks: any[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoria = (params.get('nombre') || '').toLowerCase();
      this.loadBooks();
    });
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.allBooks = res.books ?? [];

        this.libros = this.allBooks.filter(book =>
          (book.category || '').toLowerCase() === this.categoria
        );
      },
      error: () => {
        this.libros = [];
      }
    });
  }
}