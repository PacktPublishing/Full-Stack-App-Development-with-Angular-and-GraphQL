import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { OneToMany } from "typeorm";

import { Post } from './Post';
import { Comment } from './Comment';
import { Likes } from './Like';
import { Notification } from './Notification';


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    fullName: string;
 
    @Column("text", {nullable: true})
    bio: string;
    
    @Column({unique:true})
    email: string;

    @Column({unique:true})
    username: string;
    
    @Column()
    password: string;
    
    @Column({nullable: true})
    image: string;
    
    @Column({nullable: true})
    coverImage: string;
    
    @Column({default: 0})
    postsCount: number;

    @OneToMany(type => Post, post => post.author) 
    posts: Post[];

    @OneToMany(type => Comment, comment => comment.author) 
    comments: Comment[];

    @OneToMany(type => Likes, likes => likes.user) 
    likes: Likes[];

    @OneToMany(type => Notification, notification => notification.user) 
    notifications: Notification[];

    @CreateDateColumn()
    createdAt: Date;

}

// Let's say a post has one author, and each author can have many posts.


