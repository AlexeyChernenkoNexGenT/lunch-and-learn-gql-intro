import { registerEnumType } from 'type-graphql';

export enum PetType {
  cat = 'CAT',
  dog = 'DOG',
}

registerEnumType(PetType, {
  name: 'PetType',
  description: 'The type of pet',
});
