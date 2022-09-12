import { BooksApiService } from './../service/book-api/book-api.service';
import { BookData } from 'src/app/model/BookData';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookData!:FormGroup;
  bookObj : BookData = new BookData();
  //let bookData = new BookData();
  constructor(private formBuilder:FormBuilder,private dialog:Dialog,private bookApi:BooksApiService) { }

  ngOnInit(): void {
    this.bookData=this.formBuilder.group({
      name:['',Validators.required],
      author:['',Validators.required],
      type:['',Validators.required],
      price:['',Validators.required]
    })
  }

  close(){
    this.dialog.closeAll();
  }
  onAdd(){
    if(this.bookData.valid){
      this.bookObj.name=this.bookData.value['name'];
      this.bookObj.author=this.bookData.value['author'];
      this.bookObj.type=this.bookData.value['type'];
      this.bookObj.price=this.bookData.value['price'];
      console.log(this.bookObj); 
      this.bookApi.postBook(this.bookObj).subscribe((response)=>{
        this.close();   
        alert("New Book Added Successfully")
        location.reload();
      },(error)=>{
        alert("Book Not Added Something happen worng..!");
        this.close();
      })
      
    } else {
      alert("All Field are Mandatory..!")  
    }
  }

}
