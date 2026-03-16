import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc";

export const tutorsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        page:        z.number().min(1).default(1),
        limit:       z.number().min(1).max(50).default(12),
        specialty:   z.string().optional(),
        minRate:     z.number().optional(),
        maxRate:     z.number().optional(),
        minRating:   z.number().optional(),
        search:      z.string().optional(),
        sortBy:      z.enum(["rating", "price_asc", "price_desc", "lessons"]).default("rating"),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, specialty, minRate, maxRate, minRating, search, sortBy } = input;
      const skip = (page - 1) * limit;

      const where = {
        isApproved: true,
        isActive:   true,
        ...(specialty && { specialties: { has: specialty } }),
        ...(minRate   && { hourlyRate:  { gte: minRate } }),
        ...(maxRate   && { hourlyRate:  { lte: maxRate } }),
        ...(minRating && { avgRating:   { gte: minRating } }),
        ...(search    && {
          OR: [
            { displayName: { contains: search, mode: "insensitive" as const } },
            { bio:         { contains: search, mode: "insensitive" as const } },
            { tagline:     { contains: search, mode: "insensitive" as const } },
          ],
        }),
      };

      const orderBy =
        sortBy === "price_asc"  ? { hourlyRate:   "asc"  as const } :
        sortBy === "price_desc" ? { hourlyRate:   "desc" as const } :
        sortBy === "lessons"    ? { totalLessons: "desc" as const } :
                                  { avgRating:    "desc" as const };

      const [tutors, total] = await Promise.all([
        ctx.prisma.tutorProfile.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: { user: { select: { name: true, avatarUrl: true } } },
        }),
        ctx.prisma.tutorProfile.count({ where }),
      ]);

      return { tutors, total, pages: Math.ceil(total / limit), page };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const tutor = await ctx.prisma.tutorProfile.findUnique({
        where: { id: input.id },
        include: {
          user:          { select: { name: true, avatarUrl: true, createdAt: true } },
          availabilities: true,
        },
      });
      if (!tutor) throw new Error("Tutor not found");
      return tutor;
    }),

  reviews: publicProcedure
    .input(z.object({ tutorId: z.string(), page: z.number().default(1), limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      const { tutorId, page, limit } = input;
      const skip = (page - 1) * limit;
      const [reviews, total] = await Promise.all([
        ctx.prisma.review.findMany({
          where:   { subject: { tutorProfile: { id: tutorId } }, isPublic: true },
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
          include: { author: { select: { name: true, avatarUrl: true } } },
        }),
        ctx.prisma.review.count({
          where: { subject: { tutorProfile: { id: tutorId } }, isPublic: true },
        }),
      ]);
      return { reviews, total, pages: Math.ceil(total / limit) };
    }),
});
