import { ListofBooksComponent } from './listof-books/listof-books.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { CompletedBooksComponent } from './completed-books/completed-books.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './service/guards/auth.guard';
import { UserLoginComponent } from './user-login/user-login.component';
import { WishlistBooksComponent } from './wishlist-books/wishlist-books.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],
  children: [
    {path:'allbooks',component:AllBooksComponent,canActivate:[AuthGuard],},
    {path:'wishlist',component:WishlistBooksComponent,canActivate:[AuthGuard],},
    {path:'completedlist',component:CompletedBooksComponent,canActivate:[AuthGuard],}
  ]
  },
  {path:'listofbooks',component:ListofBooksComponent},  
  {path:'',component:UserLoginComponent},
  {path:'addbook',component:AddBookComponent},
  {path:'login',component:UserLoginComponent},
  {path:'**',component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
