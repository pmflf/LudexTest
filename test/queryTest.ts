import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { type Context, createMockContext, type MockContext } from "../src/graphql/context"
import { mockServer } from "@graphql-tools/mock"
import { schema } from "../src/graphql/schema";

chai.use(chaiAsPromised);

const todoMockServer = mockServer(schema, {})

describe("testing queries", () => {
  let mockCtx: MockContext
  let ctx: Context


	beforeEach(() => {
		mockCtx = createMockContext()
		ctx = mockCtx as unknown as Context
	})

	it("should return a list of todo objects", async () => {
		const todo = [
			{
				id: "1",
				title: "test Todo",
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
				dueDate: new Date(),
			},
		]

		mockCtx.prisma.todo.findMany.mockResolvedValue(todo)


		const query = /* GraphQL */ `
			{
				getAllTodo {
					id
					title
					completed
				}
			}
		`
		chai.expect(todoMockServer.query(query)).to.deep.equal(
			[
				{
					id: "1",
					title: "test Todo",
					completed: false,
				},
			]
		)
	});
});
