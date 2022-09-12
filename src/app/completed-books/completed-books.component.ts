import { BookData } from 'src/app/model/BookData';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BooksApiService } from '../service/book-api/book-api.service';

@Component({
  selector: 'app-completed-books',
  templateUrl: './completed-books.component.html',
  styleUrls: ['./completed-books.component.css']
})
export class CompletedBooksComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'name', 'author', 'type','price','completed'];
  dataSource!: MatTableDataSource<any>;
  bookObj:BookData = new BookData();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  completedBook:any=[];
  constructor(private bookApi:BooksApiService,private router:Router){}
  ngOnInit(): void {
    this.listOfBooks();
  }

  listOfBooks(){
    this.bookApi.getBooks().subscribe((response)=>{
     
      let i=0;
      for (const iterator of response) {
        if(iterator.completed){
          this.completedBook[i]=iterator;
          i++;
        }
      }
      console.log(this.completedBook);
      this.dataSource = new MatTableDataSource(this.completedBook);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error)=>{
      console.log("Error ...!")
    })
  }
  completedListChange(bookRow:any){ 

    this.bookObj.id=bookRow.id;
    this.bookObj.name=bookRow.name;
    this.bookObj.author=bookRow.author;
    this.bookObj.type=bookRow.type;
    this.bookObj.price=bookRow.price;
    this.bookObj.completed=false;
    this.bookObj.wishlist=bookRow.wishlist;
    console.log(bookRow);
   
    this.bookApi.updateBook(this.bookObj,bookRow.id).subscribe((response)=>{
       alert("Remove from Completed list")
       location.reload();
    }
    );                 
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
