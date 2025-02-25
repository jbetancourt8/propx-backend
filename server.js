import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "http";

// Hardcoded Data
const users = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Doe", email: "jane@example.com" },
];

const posts = [
  {
    id: "101",
    title: "First Post",
    content: "This is my first post!",
    authorId: "1",
  },
  { id: "102", title: "Second Post", content: "Hello world!", authorId: "2" },
];

// GraphQL Schema
const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
  },
  Post: {
    author: (post) => users.find((user) => user.id === post.authorId),
  },
  User: {
    posts: (user) => posts.filter((post) => post.authorId === user.id),
  },
};

// Create Yoga GraphQL Server
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

// Create HTTP Server
const server = createServer(yoga);
const PORT = 4000;

// Start Server
server.listen(PORT, () => {
  console.log(
    `GraphQL Yoga server is running at http://localhost:${PORT}/graphql`
  );
});
