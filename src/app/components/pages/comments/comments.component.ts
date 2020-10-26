import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() title = 'Nuevo Comentario';
  @Output() sendChangeTitle  = new EventEmitter<any>();
  event: string;

  constructor(private fb: FormBuilder,
              private commentsService: CommentsService,
              private route: ActivatedRoute,
              private router: Router) {
      this.buildCommentForm();
      this.changeTitle();
  }

  ngOnInit(): void {
     // tslint:disable-next-line: radix
     this.id = parseInt(this.route.snapshot.paramMap.get('id'));
     if (this.id !== 0){
        this.commentsService.getComment(this.id).subscribe(resp => {
          this.commentDetail = resp.result;
          this.buildCommentForm(this.commentDetail);
          this.title = 'Editar Comentario';
          this.changeTitle();
        });
     }

  }

  buildCommentForm(comments?: Comments) {
    this.commentForm = this.fb.group({
      name:              [((comments) && (comments.name)) ? comments.name.toString() : '', [Validators.required, Validators.pattern('^[A-Za-z]+$'), Validators.maxLength(35)]],
      email:             [((comments) && (comments.email)) ? comments.email.toString() : '',  [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      content:           [((comments) && (comments.content)) ? comments.content.toString() : '', [Validators.required, Validators.pattern('^[A-Za-z]+$'), Validators.maxLength(100)]],
      website:           [((comments) && (comments.website)) ? comments.website.toString() : '', [Validators.pattern('(http?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
   });
  }

  save(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Guardando comentario...'
    });

    Swal.showLoading();

    if (this.id === 0){
      this.commentsService.createComment(this.commentForm.value).subscribe(resp => {
        Swal.fire('Comentario', 'Se ha guardado el comentario', 'success');
        this.router.navigate(['comments']);
      }, error => {
        Swal.fire('Error al Guardar Comentario', 'No se ha creado el Comentario, ocurrió un error', 'error');
      });
    }else{
      this.commentsService.updateComment(this.id, this.commentForm.value).subscribe(resp => {
        Swal.fire('Comentario', 'Se ha actualizado el comentario', 'success');
        this.router.navigate(['comments']);
      }, error => {
        Swal.fire('Error al Guardar Comentario', 'No se ha actualizado el Comentario, ocurrió un error', 'error');
      });
    }
  }

  back(){
    this.router.navigate(['comments']);
  }

  changeTitle(){
    this.sendChangeTitle.emit({title: this.title, event: this.event});
  }

}
