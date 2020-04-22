import User from './user/user.model';
import Pet from './pet/pet.model';

export type Context = {
  user: User;
  models: {
    Pet: {
      create: (input: any) => Pet;
      findMany: (input: Pet | {}) => Pet[];
      findOne: (input?: any) => Pet;
    };
    User: {
      findOne: (input?: User) => User;
    };
  };
};
