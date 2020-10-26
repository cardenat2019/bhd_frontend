import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  id: number;
  commentForm: FormGroup;
  commentDetail: Comments;

  constructor(private fb: FormBuilder,
              private commentsService: CommentsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
     // tslint:disable-next-line: radix
     this.id = parseInt(this.route.snapshot.paramMap.get('id'));
     if (this.id !== 0){
        this.commentsService.getComment(this.id).subscribe(resp => {
          this.commentDetail = resp.result;
        });
     }
     this.buildCommentForm(this.commentDetail);
  }

  buildCommentForm(comments?: Comments) {
    this.commentForm = this.fb.group({
      name:              [((comments) && (comments.name)) ? comments.name.toString() : '', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])$'), Validators.maxLength(35)]],
      // tslint:disable-next-line: max-line-length
      email:             [((comments) && (comments.email)) ? comments.email.toString() : '',  [Validators.required], Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
      content:           [((comments) && (comments.content)) ? comments.content.toString() : '', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])$'), Validators.maxLength(100)]],
      website:           [((comments) && (comments.website)) ? comments.website.toString() : '', [Validators.pattern('(http?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
   });
  }

  buildCommentFormData(comments: Comments): FormData{
    const formData: FormData = new FormData();
    formData.append('name', comments.name);
    formData.append('email', comments.email);
    formData.append('website', comments.website);
    formData.append('content', comments.content);
    return formData;
  }

  save(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Guardando comentario...'
    });

    Swal.showLoading();

    if (this.id === 0){
      this.commentsService.createComment(this.buildCommentFormData(this.commentForm.value)).subscribe(resp => {
        Swal.fire('Comentario', 'Se ha guardado el comentario', 'success');
      }, error => {
        Swal.fire('Error al Guardar Comentario', 'No se ha creado el Comentario, ocurrió un error', 'error');
      });
    }else{
      this.commentsService.updateComment(this.id, this.buildCommentFormData(this.commentForm.value)).subscribe(resp => {
        Swal.fire('Comentario', 'Se ha actualizado el comentario', 'success');
      }, error => {
        Swal.fire('Error al Guardar Comentario', 'No se ha actualizado el Comentario, ocurrió un error', 'error');
      });
    }
  }

  back(){

  }

}
