import { createClient } from '@hey-api/client-fetch'
import * as apiClient from '../rest-api-client/services.gen.ts'

type ExecutionEngineClient = typeof apiClient

export class ExecutionEngineService {
  public readonly apiClient: ExecutionEngineClient = apiClient
  private _authToken: string | undefined = undefined

  constructor(hostBaseUrl: string) {
    // This sets up the global client used by services.gen.ts
    createClient({
      baseUrl: `${hostBaseUrl}/api`
    })
      .interceptors.request.use((request) => {
        request.headers.set('Authorization', `Bearer ${this._authToken}`);

        return request;
      });
  }

  get isAuthenticated() {
    return this._authToken !== undefined
  }

  async login(): Promise<void> {
    this._authToken = (await this.apiClient.authLogin()).data?.token
  }

  async logout(): Promise<void> {
    this._authToken = undefined
  }
}
