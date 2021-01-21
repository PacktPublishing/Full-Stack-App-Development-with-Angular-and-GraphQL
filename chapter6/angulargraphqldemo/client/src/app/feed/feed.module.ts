import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';


@NgModule({
  declarations: [PostsComponent, CreatePostComponent],
  imports: [
    CommonModule,
    FeedRoutingModule
  ]
})
export class FeedModule { }
