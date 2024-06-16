import { TRPCError, initTRPC } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import jwt from 'jsonwebtoken'
import { OpenApiMeta } from 'trpc-openapi'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { state } from './state.ts'

const jwtSecret = uuid()

export type Context = {
  role: "admin" | null
  requestId: string
}

const actuatorSchema = z.object({
  actuatorId: z.string(),
  status: z.union([z.literal("idle"), z.literal("moving")])
})

const tRPC = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ error, shape }) => {
      if (error.code === 'INTERNAL_SERVER_ERROR' && process.env.NODE_ENV === 'production') {
        return { ...shape, message: 'Internal server error' }
      }

      return shape
    },
  })

export const createContext = async ({ req, res }: CreateExpressContextOptions): Promise<Context> => {
  const requestId = uuid()
  res.setHeader('x-request-id', requestId)

  let role: Context["role"] = null

  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const tokenRole = jwt.verify(token, jwtSecret) as string
      if (tokenRole == "admin") {
        role = tokenRole
      }
    }
  } catch (cause) {
    console.error(cause)
  }

  return { role, requestId }
}

const publicProcedure = tRPC.procedure
const adminProcedure = tRPC.procedure.use(({ ctx, next }) => {
  if (!ctx.role) {
    throw new TRPCError({
      message: 'User is not admin',
      code: 'UNAUTHORIZED',
    })
  }

  return next({ ctx: { ...ctx, user: ctx.role } })
})

const authRouter = tRPC.router({
  login: publicProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/auth/login',
        tags: ['auth'],
        summary: 'Login as admin',
      },
    })
    .input(
      z.void()
    )
    .output(
      z.object({ token: z.string() }),
    )
    .mutation(() => {
      return { token: jwt.sign("admin", jwtSecret) }
    }),
})

const actuatorsRouter = tRPC.router({
  getActuators: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/actuators',
        tags: ['actuators'],
        summary: 'Read all actuators',
      },
    })
    .input(
      z.void()
    )
    .output(
      z.object({ actuators: z.array(actuatorSchema) }),
    )
    .query(() => {
      return { actuators: Object.values(state.actuators) }
    }),
  getActuatorById: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/actuators/{id}',
        tags: ['actuators'],
        summary: 'Read an actuator by id',
      },
    })
    .input(
      z.object({ id: z.string() }),
    )
    .output(
      z.object({ actuator: actuatorSchema }),
    )
    .query(({ input }) => {
      const actuator = state.actuators[input.id]
      if (!actuator) {
        throw new TRPCError({
          message: 'Actuator not found',
          code: 'NOT_FOUND',
        })
      }

      return { actuator }
    }),
  move: adminProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/actuators/{id}/move',
        tags: ['actuators'],
        summary: 'Moves an actuator by id',
      },
    })
    .input(
      z.object({ id: z.string() }),
    )
    .output(
      z.object({ actuator: actuatorSchema }),
    )
    .mutation(({ input }) => {
      const actuator = state.actuators[input.id]
      if (!actuator) {
        throw new TRPCError({
          message: 'Actuator not found',
          code: 'NOT_FOUND',
        })
      }

      actuator.status = 'moving'

      return { actuator }
    }),
  stop: adminProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/actuators/{id}/stop',
        tags: ['actuators'],
        summary: 'Stops an actuator by id',
      },
    })
    .input(
      z.object({ id: z.string() }),
    )
    .output(
      z.object({ actuator: actuatorSchema }),
    )
    .mutation(({ input }) => {
      const actuator = state.actuators[input.id]
      if (!actuator) {
        throw new TRPCError({
          message: 'Actuator not found',
          code: 'NOT_FOUND',
        })
      }

      actuator.status = 'idle'

      return { actuator }
    }),
})

export const appRouter = tRPC.router({
  auth: authRouter,
  actuators: actuatorsRouter,
})

export type AppRouter = typeof appRouter
