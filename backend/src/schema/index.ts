import { baseTypeDefs } from './typeDefs/base';
import { queryTypeDefs } from './typeDefs/query';
import { inputTypeDefs, mutationTypeDefs } from './typeDefs/mutation';

// Combine all type definitions
export const typeDefs = [baseTypeDefs, queryTypeDefs, inputTypeDefs, mutationTypeDefs];
