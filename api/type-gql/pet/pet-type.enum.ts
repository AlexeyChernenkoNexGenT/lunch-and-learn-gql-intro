import { registerEnumType } from 'type-graphql';

export enum PetType {
  CAT = 'CAT',
  DOG = 'DOG',
}

registerEnumType(PetType, {
  name: 'PetType',
  description: 'The type of pet',
});
