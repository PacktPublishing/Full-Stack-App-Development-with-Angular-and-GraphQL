import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { ManyToOne } from "typeorm";

import { AfterInsert, getRepository } from "typeorm";

import { User } from './User';
import { Post } from './Post';
import { Notification } from './Notification';



@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;
 
    @Column("text")
    comment: string;

    @ManyToOne(type => User, user => user.comments)
    author: User;  

    
    @ManyToOne(type => Post, post => post.comments)
    post: Post;

    @CreateDateColumn()
    createdAt: Date;

    @AfterInsert()
    async createNotification() {
        const n = getRepository(Notification).create();
        //console.log("New notification ", this.post.author.id)
        n.user = <User>await getRepository(User).createQueryBuilder("user")
        .innerJoinAndSelect("user.posts","post")   
        .where("post.id = :id", { id: this.post.id })                   
        .getOne();

        n.postId = this.post.id;
        n.text = `${this.author.fullName} commented on your post`;
        await getRepository(Notification).save(n);
    }
}


