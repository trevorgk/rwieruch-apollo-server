import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';

import schema from './schema';
import resolvers from './resolvers';

import models, { sequelize } from './models';

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1]
  }
});

server.applyMiddleware({ app, path: '/graphql' });

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${process.env.PORT}!`);
// });

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
