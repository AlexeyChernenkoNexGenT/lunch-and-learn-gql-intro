import { InputType, Field } from 'type-graphql';
import { PetType } from './pet-type.enum';

@InputType()
export default class NewPetInput {
  @Field()
  name: string;

  @Field((type) => PetType)
  type: PetType;
}
