import { useState, useEffect, type ReactElement } from 'react'
import './App.css'
import { ExecutionEngineService } from './ExecutionEngineService.ts'
import type { ActuatorStatus } from '../../ts-server/src/state.ts'

interface AppProps {
  executionEngineService: ExecutionEngineService
}

function App({ executionEngineService }: AppProps): ReactElement {
  const [actuators, setActuators] = useState<ActuatorStatus[]>([])

  useEffect(() => {
    executionEngineService.apiClient.actuators.getActuators.query()
      .then(response => setActuators(response.actuators))
  }, [setActuators]);

  const moveActuator = (actuatorId: string): void => {
    executionEngineService.apiClient.actuators.move.mutate({ id: actuatorId })
      .then(response => {
        const newActuators = actuators.map(actuator => {
          if (actuator.actuatorId !== actuatorId) {
            return actuator
          }

          return response.actuator
        })

        setActuators(newActuators)
      })
      .catch(console.error)
  }

  const stopActuator = (actuatorId: string): void => {
    executionEngineService.apiClient.actuators.stop.mutate({ id: actuatorId })
      .then(response => {
        const newActuators = actuators.map(actuator => {
          if (actuator.actuatorId !== actuatorId) {
            return actuator
          }

          return response.actuator
        })

        setActuators(newActuators)
      })
      .catch(console.error)
  }

  return (
    <>
      <div>TRPC Client</div>
      <div onClick={() => executionEngineService.login()}>Login</div>
      <div onClick={() => executionEngineService.logout()}>Logout</div>
      {
        actuators.map(actuator => <Actuator
          key={actuator.actuatorId}
          actuator={actuator}
          onMove={() => moveActuator(actuator.actuatorId)}
          onStop={() => stopActuator(actuator.actuatorId)}
        />)
      }
    </>
  )
}

interface ActuatorProps {
  actuator: ActuatorStatus
  onMove: () => void
  onStop: () => void
}

function Actuator({ actuator, onMove, onStop }: ActuatorProps): ReactElement {
  return (
    <div className="actuator-container">
      <div>{actuator.actuatorId}</div>
      <div>{actuator.status}</div>
      <div onClick={onMove}>Move</div>
      <div onClick={onStop}>Stop</div>
    </div>
  )
}

export default App
