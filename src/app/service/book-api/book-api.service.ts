import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BookData } from 'src/app/model/BookData';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  Url="http://localhost:3000/books";
  constructor(private http:HttpClient) { }
  getBooks(){
    return this.http.get<any>(this.Url);
  }
  updateBook(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/books/"+id, data).pipe(map((res:any)=>{
      return res;
    }))
  }
  postBook(data:BookData){
    return this.http.post(this.Url,data);
  }
}
