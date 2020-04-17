import { Field, ObjectType, ID } from 'type-graphql';
import Pet from './pet.model';

@ObjectType()
export default class User {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field((type) => [Pet])
  pets: Pet[];
}
