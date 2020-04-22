import { Ctx, Arg, Mutation, Query, Resolver, FieldResolver, Root } from 'type-graphql';
import Pet from './pet.model';
import User from './user.model';
import NewPetInput from './new-pet.input';
import PetsInput from './pets.input';

@Resolver((of) => Pet)
export default class PetResolver {
  @Query((returns) => Pet)
  pet(@Arg('name') name: string, @Ctx() ctx: any): Pet {
    return ctx.models.Pet.findOne({ name });
  }

  @Query((returns) => [Pet])
  pets(@Arg('input', { nullable: true }) input: PetsInput | null, @Ctx() ctx: any): Pet[] {
    const params: any = { user: ctx.user.id };
    if (input) {
      params.type = input?.type;
    }
    return ctx.models.Pet.findMany(params);
  }

  @Mutation((returns) => Pet)
  addPet(@Arg('input') input: NewPetInput, @Ctx() ctx: any): Pet {
    const pet = ctx.models.Pet.create({ ...input, user: ctx.user.id });
    return pet;
  }

  @FieldResolver()
  owner(@Root() pet, @Ctx() ctx: any): User {
    return ctx.models.User.findOne({ id: pet.user });
  }

  @FieldResolver()
  img(@Root() pet: Pet): string {
    return pet.type === 'DOG' ? 'https://placedog.net/300/300' : 'http://placekitten.com/300/300';
  }
}
