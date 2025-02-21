import type { MutationResolvers as IMutation } from "./generated/graphql";
import type { Context } from "./context";

export const Mutation: IMutation<Context> = {
  createSomething: async (_, { input }, { prisma }) => {
    const something = await prisma.something.create({
      data: {
        name: input.name,
      },
    });

    return {
      id: something.id,
      name: something.name,
    };
  },
  //NOTE - creates a todo with a specific format of date https://scalars.graphql.org/andimarek/date-time.html
  createTodo: async (_, { input }, { prisma }) => {
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        dueDate: input.dueDate,
      },
    });

    return {
      id: todo.id,
      title: todo.title,
      dueDate: input.dueDate
    };
  },
};
