import type { FastifyReply, FastifyRequest } from 'fastify';
import { DomainError } from 'shared';
import { ZodError, z } from 'zod';

import randomService from '@infrastructure/crypto/random.service.js';

import type { FastifyRouteHandlerFn } from '../controller/controller.types.js';
import { HttpError } from './http.errors.js';

type FastifyHTTPHandler = FastifyRouteHandlerFn<object>;

const TryCatchErrors = async (req: FastifyRequest, res: FastifyReply, cb: () => Promise<void>) => {
  try {
    await cb();
  } catch (error) {
    console.log(`😫 ${error}`);

    if (error instanceof HttpError) {
      const appError = error as HttpError;

      return res.status(appError.status).send({
        statusCode: appError.status,
        body: {
          error: appError.name,
          message: appError.message,
        },
      });
    } else if (error instanceof DomainError) {
      return res.status(400).send({
        statusCode: 400,
        body: {
          error: error.name,
          message: error.message,
        },
      });
    } else if (error instanceof ZodError) {
      return res.status(400).send({
        statusCode: 400,
        body: {
          error: 'Validation error',
          message: error,
        },
      });
    }

    return res.status(500).send({
      statusCode: 500,
      body: {
        error: 'Internal Server Error',
      },
    });
  }
};

const ApiHandlerOptionsSchema = z.object({
  logging: z.boolean().optional().default(false),
  logger: z
    .object({
      log: z.function(),
    })
    .optional()
    .default(console),
});

type ApiHandlerOptions = z.infer<typeof ApiHandlerOptionsSchema>;

export const ApiHandler =
  (
    req: FastifyRequest,
    res: FastifyReply,
    options: ApiHandlerOptions = { logging: false, logger: console },
  ) =>
  async (handler: FastifyHTTPHandler) => {
    await TryCatchErrors(req, res, async () => {
      const { logging, logger } = await ApiHandlerOptionsSchema.parseAsync(options);
      const requestId = await randomService().requestId();
      const now = new Date().toTimeString();

      if (logging) {
        const msg = `HTTP ${req.method} ${req.url} (requestId: ${requestId}) ➡️  ${now} ${req.method} ${req.url}`;
        logger.log(msg);
      }

      performance.mark(requestId);

      req.id = requestId;

      const { status, body, headers } = await handler(req);

      const took = performance.measure('request to Now', requestId).duration.toFixed(2);

      if (logging) {
        logger.log(`HTTP (requestId: ${requestId}) ⬅️  ${new Date().toTimeString()} took ${took} ms`);
      }

      if (headers) res.headers(headers);

      res.send(body).status(status);
    });
  };
