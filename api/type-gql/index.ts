import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import PetResolver from './pet.resolver';
import { models, db } from '../src/db';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PetResolver],
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
