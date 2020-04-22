import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { models, db } from '../src/db';
import PetResolver from './pet.resolver';
import UserResolver from './user.resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PetResolver, UserResolver],
  });

  const server = new ApolloServer({
    schema,
    context: () => ({
      user: db.get('user').value(),
      models,
    }),
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

bootstrap().catch(err => console.error(err));
