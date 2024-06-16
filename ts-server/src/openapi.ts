import { generateOpenApiDocument } from 'trpc-openapi';

import { appRouter } from './router.ts';

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Example CRUD API',
  description: 'OpenAPI compliant REST API built using tRPC with Express',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
  tags: ['auth', 'operationalStatus', 'actuators'],
  securitySchemes: {
    BearerAuth: {
      description: "JWT Authorization header using the Bearer scheme.",
      type: "http",
      scheme: "Bearer",
      bearerFormat: "JWT",
    }
  },
});

openApiDocument.security = [
  { BearerAuth: [] },
]
