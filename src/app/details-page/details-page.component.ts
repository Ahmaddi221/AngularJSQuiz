import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, share, switchMap } from 'rxjs';
import { SingleUserRequest, UsersRequest } from '../interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {

  id$= this.route.params.pipe(
    map((params:any)=>params.id )
  )
  
  user$ = this.id$.pipe(
    switchMap(id=> this.http.get<SingleUserRequest>(`https://reqres.in/api/users/${id}`).pipe()),
    map(request=>request?.data),
    share()
  )

  constructor (private http: HttpClient, private route:ActivatedRoute) {}

  back ()
  {
    window.open('/');
  }
}
