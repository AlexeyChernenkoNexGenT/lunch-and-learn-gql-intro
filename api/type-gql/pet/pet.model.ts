import { Field, ID, Int, ObjectType } from 'type-graphql';
import User from '../user/user.model';
import { PetType } from './pet-type.enum';

@ObjectType()
export default class Pet {
  @Field((type) => ID)
  id: string;

  @Field((type) => PetType)
  type: PetType;

  @Field()
  name: string;

  @Field((type) => User)
  owner: User;

  @Field()
  img: string;

  @Field((type) => Int)
  createdAt: number;
}
