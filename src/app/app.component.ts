import { Component } from '@angular/core';
import { UserserviceService } from './userservice.service';
import { HttpClient } from '@angular/common/http';
import { SingleUserRequest, UsersRequest } from './interfaces/user.model';
import { BehaviorSubject, catchError, filter, map, of, share, switchMap, tap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserList';
  
}
