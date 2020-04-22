import User from './user.model';
import Pet from './pet.model';

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
