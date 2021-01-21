import { IResolvers } from 'apollo-server-express';

const resolvers: IResolvers = {
  Query: {
    message: () => 'It works!'
  }
};

export default resolvers;



