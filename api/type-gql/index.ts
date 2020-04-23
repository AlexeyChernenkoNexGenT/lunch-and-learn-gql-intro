import 'reflect-metadata';
import { buildSchema, ArgumentValidationError } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { models, db } from '../src/db';
import PetResolver from './pet/pet.resolver';
import UserResolver from './user/user.resolver';

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
    formatError: (err) => {
      if (err?.originalError instanceof ArgumentValidationError) {
        return {
          code: 400,
          message: err.originalError.message,
          errors: err.originalError.validationErrors.map((ve) => ({
            property: ve.property,
            constraints: ve.constraints,
          })),
        };
      }

      return err;
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

bootstrap().catch((err) => console.error(err));
