import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from 'express';
import {  ApolloServer, MockList } from 'apollo-server-express';
import   casual  from 'casual';
import cors from 'cors';


import schema from './graphql/schema';

const PORT = 8080;
const app: Application = express();
app.use('*', cors());

var postsIds: string[] = [];
var usersIds: string[] = [];

const mocks = {
  User: () => ({
    id: () => {let uuid = casual.uuid; usersIds.push(uuid); return uuid},
    fullName: casual.full_name,
    bio: casual.text,
    email: casual.email,
    username: casual.username,
    password: casual.password,
    image: 'https://picsum.photos/seed/picsum/150/150',
    coverImage: 'https://picsum.photos/seed/picsum/600/300',
    postsCount: () => casual.integer(0)
  }),
  Post: () => ({
    id: () => {let uuid = casual.uuid; postsIds.push(uuid); return uuid},
    text: casual.text,
    author: casual.random_element(usersIds),
    image: 'https://picsum.photos/seed/picsum/350/350',
    commentsCount: () => casual.integer(0,100),
    likesCount: () => casual.integer(0,100),
    latestLike: casual.first_name,
    createdAt: () => casual.date()
  }),
  Comment: () => ({
    id: casual.uuid,
    comment: casual.text,
    author: casual.random_element(usersIds),
    post: casual.random_element(postsIds),
    createdAt: () => casual.date()
  }),
  Like: () => ({
    id: casual.uuid,
    user: casual.random_element(usersIds),
    post: casual.random_element(postsIds)
  }),
  Query: () =>({
    getPostsByUserId: () => new MockList([10, 11]),
    getFeed: () => new MockList([10, 11]),
    getNotificationsByUserId: () => new MockList([10, 11]),
    getCommentsByPostId: () => new MockList([10, 11]),
    getLikesByPostId: () => new MockList([10, 11]),
    searchUsers: () => new MockList([10, 11])
  })

};

const server : ApolloServer = new ApolloServer({schema , mocks});

const connection = await createConnection()

server.applyMiddleware({
    app,
    path: '/graphql'
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
