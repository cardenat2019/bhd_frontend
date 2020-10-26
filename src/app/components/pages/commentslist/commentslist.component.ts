import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'app-commentslist',
  templateUrl: './commentslist.component.html',
  styleUrls: ['./commentslist.component.css']
})
export class CommentslistComponent implements OnInit {

  commentsList: Comments[] = [];

  constructor(private commentsService: CommentsService,
              private router: Router) { }

  ngOnInit(): void {
    this.commentsService.getCommentList().subscribe(resp => {
        this.commentsList = resp.result;
    });
  }

  newComment(){
    const id = 0;
    this.router.navigate([`comments/${id}`]);
  }

  editComment(comment: Comments){
    this.router.navigate([`comments/${comment.id}`]);
  }

  search(data){

  }

}
