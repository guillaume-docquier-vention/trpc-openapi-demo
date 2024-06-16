import fs from 'fs'
import { openApiDocument } from '../src/openapi.ts'

fs.promises
  .writeFile('ts-server-openapi.gen.json', JSON.stringify(openApiDocument, null, 2), 'utf-8')
  .then(() => console.log("File saved!"))
  .catch(console.error)
