export const typeDefs = /* GraphQL */ `
  scalar Date @specifiedBy(url: "https://scalars.graphql.org/andimarek/date-time")

  input CreateSomethingInput {
    name: String!
  }

  type Something {
    id: ID!
    name: String!
  }

  input CreateTodoInput {
    title: String!
    dueDate: Date!
  }

  input UpdateTodoCompletionInput {
    id: ID!
    completed: Boolean!
  }

  input UpdateTodoTitleInput {
    id: ID!
    title: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: Date!
    updatedAt: Date!
    dueDate: Date!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: CreateTodoInput!): Todo!
    updateTodoCompletion(input: UpdateTodoCompletionInput!): Todo!
    updateTodoTitle(input: UpdateTodoTitleInput!): Todo!
  }

  input paginationInput {
    skip: Int
    take: Int
  }

  type Query {
    hello: String
    getAllTodo(pagination: paginationInput): [Todo]
  }
`;
