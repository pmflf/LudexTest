import type { InputMaybe, QueryResolvers as IQuery, Maybe, ResolverTypeWrapper, Todo } from "./generated/graphql";
import type { Context } from "./context";
import { filter } from "graphql-yoga";
import { GraphQLError } from "graphql";

//REVIEW - Not sure if we need validation on these input parameters, I believe GraphQL does it automatically for us

export const Query: IQuery<Context> = {
  hello: () => "world",
  getAllTodo: async (_, { pagination, sorting }, { prisma }) => {
    let todos: Maybe<Maybe<ResolverTypeWrapper<Todo>>[]> | { id: string; title: string; completed: boolean; createdAt: Date; updatedAt: Date; dueDate: Date; }[] | PromiseLike<Maybe<Maybe<ResolverTypeWrapper<Todo>>[]>> = []
    const filterOptions: {
      skip: InputMaybe<number> | undefined
      take: InputMaybe<number> | undefined
      orderBy: InputMaybe<string> | undefined
    } = {
      skip: undefined,
      take: undefined,
      orderBy: undefined
    }
    if (pagination) {
      filterOptions.skip = pagination.skip
      filterOptions.take = pagination.take
    }
    if (sorting) {
      if (sorting.orderBy !== "asc" && sorting.orderBy !== "desc") {
        throw new GraphQLError("sorting order has to be asc or descending")
      }
      filterOptions.orderBy = sorting.orderBy
    }

    if (filterOptions.orderBy === "asc") {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
        orderBy: {
          createdAt: "asc"
        }
      })
    } else if(filterOptions.orderBy === "desc") {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
        orderBy: {
          createdAt: "desc"
        }
      })
    } else {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
      })
    }
    
    return todos
  },

  getAllIncompleteTodo: async (_, { pagination, sorting }, { prisma }) => {
    let todos: Maybe<Maybe<ResolverTypeWrapper<Todo>>[]> | { id: string; title: string; completed: boolean; createdAt: Date; updatedAt: Date; dueDate: Date; }[] | PromiseLike<Maybe<Maybe<ResolverTypeWrapper<Todo>>[]>> = []
    const filterOptions: {
      skip: InputMaybe<number> | undefined
      take: InputMaybe<number> | undefined
      orderBy: InputMaybe<string> | undefined
    } = {
      skip: undefined,
      take: undefined,
      orderBy: undefined
    }
    if (pagination) {
      filterOptions.skip = pagination.skip
      filterOptions.take = pagination.take
    }
    if (sorting) {
      if (sorting.orderBy !== "asc" && sorting.orderBy !== "desc") {
        throw new GraphQLError("sorting order has to be asc or descending")
      }
      filterOptions.orderBy = sorting.orderBy
    }
    
    if (filterOptions.orderBy === "asc") {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
        orderBy: {
          createdAt: "asc"
        },
        where: {
          completed: false
        }
      })
    } else if(filterOptions.orderBy === "desc") {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
        orderBy: {
          createdAt: "desc"
        },
        where: {
          completed: false
        }
      })
    } else {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
        where: {
          completed: false
        }
      })
    }
    
    return todos
    
  },

  getAllCompleteTodo: async (_, { pagination, sorting }, { prisma }) => {
    let todos: Maybe<Maybe<ResolverTypeWrapper<Todo>>[]> | { id: string; title: string; completed: boolean; createdAt: Date; updatedAt: Date; dueDate: Date; }[] | PromiseLike<Maybe<Maybe<ResolverTypeWrapper<Todo>>[]>> = []
    const filterOptions: {
      skip: InputMaybe<number> | undefined
      take: InputMaybe<number> | undefined
      orderBy: InputMaybe<string> | undefined
    } = {
      skip: undefined,
      take: undefined,
      orderBy: undefined
    }
    if (pagination) {
      filterOptions.skip = pagination.skip
      filterOptions.take = pagination.take
    }
    if (sorting) {
      if (sorting.orderBy !== "asc" && sorting.orderBy !== "desc") {
        throw new GraphQLError("sorting order has to be asc or descending")
      }
      filterOptions.orderBy = sorting.orderBy
    }
    
    if (filterOptions.orderBy === "asc") {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
        orderBy: {
          createdAt: "asc"
        },
        where: {
          completed: true
        }
      })
    } else if(filterOptions.orderBy === "desc") {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
        orderBy: {
          createdAt: "desc"
        },
        where: {
          completed: true
        }
      })
    } else {
      todos = await prisma.todo.findMany({
        skip: filterOptions.skip ?? undefined,
        take: filterOptions.take ?? undefined,
        where: {
          completed: true
        }
      })
    }
    
    return todos
  },

  getTodoById: async (_, { input }, { prisma }) => {
    const todo = await prisma.todo.findUnique({
      where: {
        id: input.id
      }
    })

    return todo
  }
};
