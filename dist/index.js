"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("./schema");
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: schema_1.schema,
    graphqlEndpoint: '/'
});
const server = (0, http_1.createServer)(yoga);
server.listen(4000, () => {
    console.log('GraphQL server is running on http://localhost:4000');
});
