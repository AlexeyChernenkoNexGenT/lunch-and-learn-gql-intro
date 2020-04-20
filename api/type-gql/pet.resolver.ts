import { Arg, Query, Resolver } from 'type-graphql';
import Pet from './pet.model';
import PetsInput from './pets.input';

@Resolver()
export default class PetResolver {
  @Query((returns) => [Pet])
  pets(@Arg('input', (type) => PetsInput) input: PetsInput): Pet[] {
    return [];
  }
}
