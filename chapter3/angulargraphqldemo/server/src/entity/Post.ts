import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { OneToOne, OneToMany, ManyToOne, JoinColumn } from "typeorm";

import { User } from './User';
import { Comment } from './Comment';
import { Likes } from './Like';


@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

 
    @Column("longtext")
    text: string;
    
    @Column({nullable: true})
    image: string;
    
    @Column({default: 0})
    commentsCount: number;
    
    @Column({default: 0})
    likesCount: number;

    @OneToOne(type => Comment, comment => comment.post)
    @JoinColumn()
    latestComment: Comment;
    
    @Column({default: ""})
    latestLike: string;


    @ManyToOne(type => User, user => user.posts)
    author: User;  

    @OneToMany(type => Comment, comment => comment.post) 
    comments: Comment[];

    @OneToMany(type => Likes, likes => likes.post) 
    likes: Likes[];


    @CreateDateColumn()
    createdAt: Date;
}


