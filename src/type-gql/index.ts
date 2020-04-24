import 'reflect-metadata';
import { buildSchema, ArgumentValidationError, UnauthorizedError } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { models, db } from '../db';
import PetResolver from './pet/pet.resolver';
import UserResolver from './user/user.resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PetResolver, UserResolver],
    authChecker: ({ root, args, context, info }, roles) =>
      context?.req?.headers?.authorization === 'token',
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
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

      if (err?.originalError instanceof UnauthorizedError) {
        return {
          code: 401,
          message: err.originalError.message,
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
