import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import Pet from './pet.model';
import PetsInput from './pets.input';

@Resolver((of) => Pet)
export default class PetResolver {
  @Query((returns) => [Pet])
  pets(@Arg('input') input: PetsInput): Pet[] {
    return [];
  }
}
