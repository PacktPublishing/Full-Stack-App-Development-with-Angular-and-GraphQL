import "reflect-metadata";
import { createConnection , Connection } from "typeorm";
import express, { Application } from 'express';
import {  ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import schema from './graphql/schema';


const connection: Promise<Connection> = createConnection();

connection.then(() => {

    const PORT = 8080;
    const app: Application = express();
    app.use('*', cors());
    const server: ApolloServer = new ApolloServer({ schema });
    server.applyMiddleware({
       app,
       path: '/graphql'
    });


    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });    
}).catch(error => console.log("Database connection error: ", error));

