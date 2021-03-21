import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { ManyToOne } from "typeorm";
import {  AfterInsert, getRepository } from "typeorm";

import { User } from './User';
import { Post } from './Post';
import { Notification } from './Notification';


@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(type => User, user => user.likes)
    user: User;  

    
    @ManyToOne(type => Post, post => post.likes)
    post: Post;

    @CreateDateColumn()
    createdAt: Date;

    @AfterInsert()
    async createNotification() {
        const n = getRepository(Notification).create();
        n.user = <User>await getRepository(User).createQueryBuilder("user")
        .innerJoinAndSelect("user.posts","post")   
        .where("post.id = :id", { id: this.post.id })                   
        .getOne();

        n.postId = this.post.id;
        n.text = `${this.user.fullName} liked your post`;
        await getRepository(Notification).save(n);
    }
}

