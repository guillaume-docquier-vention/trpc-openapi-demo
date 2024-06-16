import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';

import { openApiDocument } from './openapi.ts';
import { appRouter, createContext } from './router.ts';

const app = express();

app.use(cors());

app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext }));

// @ts-ignore -- It requires arguments that are optional, not sure why
app.use('/api', createOpenApiExpressMiddleware({ router: appRouter, createContext }));

// Serve Swagger UI with our OpenAPI schema
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(openApiDocument));

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
