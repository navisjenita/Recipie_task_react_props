import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { publicProcedure, router } from '../trpc';

const prisma = new PrismaClient();

export const customerRouter = router({

  customerlist: publicProcedure.query(async () => {
    const users = await prisma.customer.findMany();
    return users;
  }),


  customercreate: publicProcedure.input(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      address: z.string(),

    })
  ).mutation(async (opts) => {
    const { input } = opts;
    const user = await prisma.customer.create({
      data: {
        name: input.name,
        email: input.email,
        address: input.address,

      },
    });
    return user;
  }),
});