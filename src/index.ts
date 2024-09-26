import { createServer } from 'http';  
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';  


const yoga = createYoga({
  schema,
    graphqlEndpoint: '/',
    cors: {
      origin: '*',  
      methods: ['GET', 'POST','PUT', 'DELETE'],  
      allowedHeaders: ['Content-Type', 'Authorization'],  
      credentials: true, 
    },
});
 

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('GraphQL server is running on http://localhost:4000');
});
