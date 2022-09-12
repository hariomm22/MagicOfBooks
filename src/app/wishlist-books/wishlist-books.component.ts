import { AuthenticationService } from './../service/authentication/authentication.service';
import { BookData } from 'src/app/model/BookData';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BooksApiService } from '../service/book-api/book-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-books',
  templateUrl: './wishlist-books.component.html',
  styleUrls: ['./wishlist-books.component.css']
})
export class WishlistBooksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'author', 'type','price','wishlist'];
  dataSource!: MatTableDataSource<any>;
  bookObj:BookData = new BookData();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  wishlistBook:any=[];
  constructor(private bookApi:BooksApiService,private router:Router,private authentication:AuthenticationService){}
  ngOnInit(): void {
    this.listOfBooks();
  }

  listOfBooks(){
    this.bookApi.getBooks().subscribe((response)=>{
 
      let i=0;
      for (const iterator of response) {
        if(iterator.wishlist){
          this.wishlistBook[i]=iterator;
          i++;
        }
      }
      console.log(this.wishlistBook);
      this.dataSource = new MatTableDataSource(this.wishlistBook);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error)=>{
      console.log("Error ...!")
    })
  }

  wishListChange(bookRow:any){
  
      this.bookObj.id=bookRow.id;
      this.bookObj.name=bookRow.name;
      this.bookObj.author=bookRow.author;
      this.bookObj.type=bookRow.type;
      this.bookObj.price=bookRow.price;
      this.bookObj.wishlist=false;    
      this.bookObj.completed=bookRow.completed;
    
      this.bookApi.updateBook(this.bookObj,bookRow.id).subscribe((response)=>{
        alert("Remove from Wishlist list")
        this.authentication.isAuthenticated=true;
        this.router.navigate(['dashboard/wishlist']);
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
