import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { ManyToOne } from "typeorm";

import { User } from './User';

@Entity()
export class Notification {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()    
    text: string;
   
    
    @Column()    
    postId: number;
   
    @ManyToOne(type => User, user => user.notifications)
    user: User;  

    @CreateDateColumn()
    createdAt: Date;
}
