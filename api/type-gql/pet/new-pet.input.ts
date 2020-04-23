import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { PetType } from './pet-type.enum';

@InputType()
export default class NewPetInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field((type) => PetType)
  type: PetType;
}
