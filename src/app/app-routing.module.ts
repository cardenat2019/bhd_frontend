import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommentslistComponent} from './components/pages/commentslist/commentslist.component';
import {CommentsComponent} from './components/pages/comments/comments.component';

const routes: Routes = [
  { path: '', component: CommentslistComponent },
  { path: 'commentslist', component: CommentslistComponent },
  { path: 'comments/:id', component: CommentsComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
