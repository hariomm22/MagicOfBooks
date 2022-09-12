import { BookData } from 'src/app/model/BookData';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BooksApiService } from '../service/book-api/book-api.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'name', 'author', 'type','price','wishlist','completed'];
  dataSource!: MatTableDataSource<any>;
  bookObj:BookData = new BookData();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private bookApi:BooksApiService,private router:Router,private dialog:Dialog){}
  ngOnInit(): void {
    this.listOfBooks();
  }
  wishListChange(bookRow:any){
      this.bookObj.id=bookRow.id;
      this.bookObj.name=bookRow.name;
      this.bookObj.author=bookRow.author;
      this.bookObj.type=bookRow.type;
      this.bookObj.price=bookRow.price;
      if(bookRow.wishlist){
        this.bookObj.wishlist=false;
      } else {
        this.bookObj.wishlist=true;
      }
      this.bookObj.completed=bookRow.completed;
      this.bookApi.updateBook(this.bookObj,bookRow.id).subscribe((response)=>{
        this.listOfBooks();
      }
      );                 
  }


  openBookDialog() {
    this.dialog.open(AddBookComponent, {
      width:'30%'
    });
  }

  openUserDialog(){
    this.dialog.open(UserRegisterComponent,{
      width:'40%'
    });
  }

  completedListChange(bookRow:any){ 
      this.bookObj.id=bookRow.id;
      this.bookObj.name=bookRow.name;
      this.bookObj.author=bookRow.author;
      this.bookObj.type=bookRow.type;
      this.bookObj.price=bookRow.price;
      if(bookRow.completed){
        this.bookObj.completed=false;
      } else {
        this.bookObj.completed=true;
      }
      this.bookObj.wishlist=bookRow.wishlist;
      this.bookApi.updateBook(this.bookObj,bookRow.id).subscribe((response)=>{
        this.listOfBooks();
      }
      );                 
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}