import { InputType, Field } from 'type-graphql';
import { PetType } from './pet-type.enum';

@InputType()
export default class PetsInput {
  @Field((type) => PetType)
  type: PetType;
}
