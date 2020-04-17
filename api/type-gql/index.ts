import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import PetResolver from './pet.resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PetResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

bootstrap();
