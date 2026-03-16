import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";

// Context
export async function createContext(opts?: CreateNextContextOptions) {
  return { prisma };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Auth middleware (stub — wire up NextAuth session in Phase 2)
const isAuthed = t.middleware(({ ctx, next }) => {
  // TODO: validate session
  return next({ ctx });
});

export const protectedProcedure = t.procedure.use(isAuthed);
