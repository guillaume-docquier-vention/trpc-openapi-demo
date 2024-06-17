# ts-server

A Typescript NodeJS backend that uses [@trpc/server](https://www.npmjs.com/package/@trpc/server) to create a fully typed trpc api client from Typescript types without having to generate anything.  
The backend serves trpc with [Express](https://www.npmjs.com/package/express) to demonstrate the easy adoption curve.

This project also uses [trpc-openapi](https://www.npmjs.com/package/trpc-openapi) to generate an openapi spec from the trpc routes with little overhead.  
The openapi spec is used by swagger to display the swagger ui.
