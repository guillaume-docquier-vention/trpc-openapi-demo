import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: '../ts-server/ts-server-openapi.gen.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './rest-api-client',
  },
  types: {
    enums: 'javascript',
  },
});
