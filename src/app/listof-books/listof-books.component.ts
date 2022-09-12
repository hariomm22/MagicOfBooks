import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BooksApiService } from '../service/book-api/book-api.service';

@Component({
  selector: 'app-listof-books',
  templateUrl: './listof-books.component.html',
  styleUrls: ['./listof-books.component.css']
})
export class ListofBooksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'author', 'type','price'];
  dataSource!: MatTableDataSource<any>;
  paginator: any;
  sort: any;
  constructor(private bookApi:BooksApiService,private router:Router) { }

  ngOnInit(): void {
    this.listOfBooks()
  }
  listOfBooks(){
    this.bookApi.getBooks().subscribe((response)=>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error)=>{
      console.log("Error ...!")
    })
  }
  
  goBack(){
    this.router.navigate(['login']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
