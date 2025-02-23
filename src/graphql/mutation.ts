import type { MutationResolvers as IMutation } from "./generated/graphql";
import type { Context } from "./context";
import { GraphQLError, validate } from "graphql";

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
    if (!input){
      throw new GraphQLError("input is required with field 'title' and 'dueDate'")
    }
    if (typeof input.title !== "string" || typeof input.dueDate !== "string" ) {
      throw new GraphQLError("title and dueDate has to be strings")
    }
    
    //NOTE - try to convert input into date 
    let inputDate: Date
    try {
      inputDate = new Date(input.dueDate)
    } catch (err) {
      throw new GraphQLError("due date has to be able to be converted into a Date object")
    }
    //NOTE - transforms the date into the required format
    const transformedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits:2})}-${inputDate.getDate().toLocaleString('en-US', {minimumIntegerDigits:2})}T${inputDate.getHours()}:${inputDate.getMinutes()}:${inputDate.getSeconds()}.000Z`

		const todo = await prisma.todo.create({
			data: {
				title: input.title,
				dueDate: transformedDate,
			},
		});

		return {
			id: todo.id,
			title: todo.title,
			completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
			dueDate: todo.dueDate,
		};
	},

	//NOTE - updates the completed status of a todo
	updateTodoCompletion: async (_, { input }, { prisma }) => {
		const todo = await prisma.todo.update({
			where: {
				id: input.id,
			},
			data: {
				completed: input.completed,
			},
		});

		return {
			id: todo.id,
			title: todo.title,
			completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
			dueDate: todo.dueDate,
		};
	},

	//NOTE - updates the title of a todo
	updateTodoTitle: async (_, { input }, { prisma }) => {
		const todo = await prisma.todo.update({
			where: {
				id: input.id,
			},
			data: {
				title: input.title,
			},
		});

		return {
			id: todo.id,
			title: todo.title,
			completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
			dueDate: todo.dueDate,
		};
	},
};
