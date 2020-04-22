import { Ctx, Query, Resolver, FieldResolver, Root } from 'type-graphql';
import Pet from './pet.model';
import User from './user.model';
import { Context } from './context.model';

@Resolver((of) => User)
export default class UserResolver {
  @Query()
  user(@Ctx() ctx: Context): User {
    return ctx.models.User.findOne();
  }

  @FieldResolver()
  pets(@Root() user: User, @Ctx() ctx: Context): Pet[] {
    return ctx.models.Pet.findMany({ user: user.id });
  }
}
