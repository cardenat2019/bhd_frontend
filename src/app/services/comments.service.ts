import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  constructor(private http: HttpClient,
              private router: Router) { }

  getComment(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}comments/${id}`);
  }

  getCommentList(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}comments`);
  }

  createComment(commentForm: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}comments/`, commentForm);
  }

  updateComment(id: number, commentForm: FormData): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}comments/${id}`, commentForm);
  }
}
