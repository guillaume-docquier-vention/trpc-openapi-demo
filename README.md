# trpc-openapi-demo
A demo of what trpc can do.

`ts-server` provides the backend server to be consumed. It uses [trpc](https://trpc.io/), [trpc-openapi](https://www.npmjs.com/package/trpc-openapi) and [Express](https://www.npmjs.com/package/express).  
We also expose 3 clients:
- `ts-trpc-client`: A frontend that uses [@trpc/client](https://www.npmjs.com/package/@trpc/client) to leverage a fully typed api client from the exported trpc Typescript types.
- `ts-openapi-client`: A frontend that uses [@hey-api/openapi-ts](https://heyapi.vercel.app/) to generate a REST api client from an openapi spec.
- `py-client`: A backend server that uses ??? to generate a REST api client from and open api spec.
