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
    dueDate: String!
  }

  input UpdateTodoCompletionInput {
    id: ID!
    completed: Boolean!
  }

  input UpdateTodoTitleInput {
    id: ID!
    title: String!
  }

  input DeleteTodoInput {
    id: ID!
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
    deleteTodo(input: DeleteTodoInput): String!
  }

  input paginationInput {
    skip: Int
    take: Int
  }

  input getTodoByIdInput {
    id: ID!
  }

  type Query {
    hello: String
    getAllTodo(pagination: paginationInput): [Todo]
    getAllIncompleteTodo(pagination: paginationInput): [Todo]
    getAllCompleteTodo(pagination: paginationInput): [Todo]
    getTodoById(input: getTodoByIdInput!): Todo
  }
`;
