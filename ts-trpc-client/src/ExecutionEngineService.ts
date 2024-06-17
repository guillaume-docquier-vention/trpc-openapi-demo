import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter as ExecutionEngineRPC } from '../../ts-server/src/router.ts'

type ExecutionEngineClient = ReturnType<typeof createTRPCClient<ExecutionEngineRPC>>

export class ExecutionEngineService {
  public readonly apiClient: ExecutionEngineClient
  private _authToken: string | undefined

  constructor(hostBaseUrl: string) {
    this.apiClient = createExecutionEngineClient(hostBaseUrl, () => this._authToken)
  }

  get isAuthenticated() {
    return this._authToken !== undefined
  }

  async login(): Promise<void> {
    this._authToken = (await this.apiClient.auth.login.mutate()).token
  }

  async logout(): Promise<void> {
    this._authToken = undefined
  }
}

function createExecutionEngineClient(hostBaseUrl: string, getAuthToken: () => string | undefined): ExecutionEngineClient {
  return createTRPCClient<ExecutionEngineRPC>({
    links: [
      httpBatchLink({
        url: `${hostBaseUrl}/api/trpc`,
        headers() {
          const authToken = getAuthToken()

          return {
            authorization: authToken ? `Bearer ${authToken}` : undefined,
          }
        },
      }),
    ],
  })
}
