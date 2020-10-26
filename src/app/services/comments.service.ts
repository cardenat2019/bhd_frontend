import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient,
              private router: Router) { }

  getComment(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}comments/${id}`);
  }

  getCommentList(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}comments`);
  }

  createComment(commentForm): Observable<any> {
    const url = `${environment.apiUrl}comments/`;
    return this.http.post<any>(`${environment.apiUrl}comments/`, JSON.stringify(commentForm), this.httpOptions);
  }

  updateComment(id: number, commentForm): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}comments/${id}`, JSON.stringify(commentForm), this.httpOptions);
  }
}
