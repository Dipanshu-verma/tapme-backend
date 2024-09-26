// src/schema.ts
import { createSchema } from 'graphql-yoga';
import { supabase } from './supabase'; // Ensure supabase.ts is correctly set up

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      username: String!
      coins: Int!
    }

    type Query {
      getUser(id: ID!): User
    }

    type Mutation {
      createUser(username: String!): User
      updateCoins(id: ID!, coins: Int!): User
    }
  `,
  resolvers: {
    Query: {
      getUser: async (_: any, { id }: { id: string }) => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw new Error(error.message);
        return data;
      },
    },
    Mutation: {
      createUser: async (_: any, { username }: { username: string }) => {
        const { data, error } = await supabase
          .from('users')
          .insert([{ username, coins: 0 }])
          .select()
          .single();

        if (error) throw new Error(error.message);
        return data;
      },
      updateCoins: async (_: any, { id, coins }: { id: string; coins: number }) => {
        const { data, error } = await supabase
          .from('users')
          .update({ coins })
          .eq('id', id)
          .select()
          .single();

        if (error) throw new Error(error.message);
        return data;
      },
    },
  },
});
