import "dotenv/config";
import cors from "cors";
// import morgan from "morgan";
// import path from "path";
// import dotenv from "dotenv";
import http from 'http';

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";

import prisma from "./common/prisma-client";

// const envPath = path.join(__dirname, "../../.env");
// dotenv.config(envPath);

const app = express();
const httpServer = http.createServer(app);

app.use(cors());

const server = new ApolloServer({
  introspection: true,
  typeDefs: typeDefs,
  resolvers,
  playground: true,
  context: (request) => ({
    ...request,
    prisma,
  }),
});

server.applyMiddleware({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 5050;

httpServer.listen({ port: port }, () =>
    console.log(`Prisma test server localhost:${port}`)
);
