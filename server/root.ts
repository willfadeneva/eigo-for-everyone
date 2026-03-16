import { router } from "@/server/trpc";
import { tutorsRouter } from "@/server/routers/tutors";

export const appRouter = router({
  tutors: tutorsRouter,
});

export type AppRouter = typeof appRouter;
