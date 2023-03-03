import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, switchMap, catchError, of, map, share, filter, tap } from 'rxjs';
import { SingleUserRequest, UsersRequest } from '../interfaces/user.model';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  totalPages = 1;
  searchControl = new FormControl();

  users = new Array<any>();
  page$ = new BehaviorSubject(1);

  searchedUser$ = this.searchControl.valueChanges.pipe(
    switchMap(id=>this.http.get<SingleUserRequest>(`https://reqres.in/api/users/${id}`).pipe(
      catchError(()=>of(null))
    )
    ),
    map(request=>request?.data),
    share(),
    
  )

  users$ = this.page$.pipe(
    filter(page=>page>=1 && page<=this.totalPages),
    switchMap(page=>
      this.http.get<UsersRequest>(`https://reqres.in/api/users?page=${page}`)
      ),
      tap(request=>this.totalPages=request.total_pages),
      share()
  )


  constructor (private sva : UserserviceService, private http: HttpClient, private router:Router){ }


  onNext(){

    const currentPage = this.page$.getValue();
    if (currentPage < this.totalPages){
      this.page$.next(currentPage + 1)
    }
  }
  onPrev(){
    const currentPage = this.page$.getValue();
    if (currentPage> 1){
      this.page$.next(currentPage- 1)
    }
  }
  viewMore(value:any):void{
    
   window.open(`${value}`);
  }

}
