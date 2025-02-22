import type { QueryResolvers as IQuery, Maybe, ResolverTypeWrapper, Todo } from "./generated/graphql";
import type { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",

  getAllTodo: async (_, { pagination }, { prisma }) => {
    let todos: Maybe<Maybe<ResolverTypeWrapper<Todo>>[]> | { id: string; title: string; completed: boolean; createdAt: Date; updatedAt: Date; dueDate: Date; }[] | PromiseLike<Maybe<Maybe<ResolverTypeWrapper<Todo>>[]>> = []
    if (pagination) {
      todos = await prisma.todo.findMany(
        {
          skip: pagination.skip ?? 0,
          //NOTE - undefined makes it so it fetches everything
          take: pagination.take ?? undefined
        }
      )
    }
    else {
      todos = await prisma.todo.findMany()
    }
    
    return todos
  },

  getAllIncompleteTodo: async (_, { pagination }, { prisma }) => {
    let todos: Maybe<Maybe<ResolverTypeWrapper<Todo>>[]> | { id: string; title: string; completed: boolean; createdAt: Date; updatedAt: Date; dueDate: Date; }[] | PromiseLike<Maybe<Maybe<ResolverTypeWrapper<Todo>>[]>> = []
    if (pagination) {
      todos = await prisma.todo.findMany(
        {
          where: {
            completed: false
          },
          skip: pagination.skip ?? 0,
          //NOTE - undefined makes it so it fetches everything
          take: pagination.take ?? undefined
        }
      )
    }
    else {
      todos = await prisma.todo.findMany({
        where: {
          completed: false
        }
      })
    }
    
    return todos
  },

  getAllCompleteTodo: async (_, { pagination }, { prisma }) => {
    let todos: Maybe<Maybe<ResolverTypeWrapper<Todo>>[]> | { id: string; title: string; completed: boolean; createdAt: Date; updatedAt: Date; dueDate: Date; }[] | PromiseLike<Maybe<Maybe<ResolverTypeWrapper<Todo>>[]>> = []
    if (pagination) {
      todos = await prisma.todo.findMany(
        {
          where: {
            completed: true
          },
          skip: pagination.skip ?? 0,
          //NOTE - undefined makes it so it fetches everything
          take: pagination.take ?? undefined
        }
      )
    }
    else {
      todos = await prisma.todo.findMany({
        where: {
          completed: true
        }
      })
    }
    
    return todos
  },
};
