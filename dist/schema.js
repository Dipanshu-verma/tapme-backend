"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
// src/schema.ts
const graphql_yoga_1 = require("graphql-yoga");
const supabase_1 = require("./supabase"); // Ensure supabase.ts is correctly set up
exports.schema = (0, graphql_yoga_1.createSchema)({
    typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      username: String!
      coins: Int!
    }

    type Query {
      getUser(username: String!): User
    }

    type Mutation {
      createUser(username: String!): User
      updateCoins(id: ID!, coins: Int!): User
    }
  `,
    resolvers: {
        Query: {
            getUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username }) {
                const { data, error } = yield supabase_1.supabase
                    .from('users')
                    .select('*')
                    .eq('username', username)
                    .single();
                if (error)
                    throw new Error(error.message);
                return data;
            }),
        },
        Mutation: {
            createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username }) {
                const { data, error } = yield supabase_1.supabase
                    .from('users')
                    .insert([{ username, coins: 0 }])
                    .select()
                    .single();
                if (error)
                    throw new Error(error.message);
                return data;
            }),
            updateCoins: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, coins }) {
                const { data, error } = yield supabase_1.supabase
                    .from('users')
                    .update({ coins })
                    .eq('id', id)
                    .select()
                    .single();
                if (error)
                    throw new Error(error.message);
                return data;
            }),
        },
    },
});
