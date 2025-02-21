import type { QueryResolvers as IQuery } from "./generated/graphql";
import type { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
};
