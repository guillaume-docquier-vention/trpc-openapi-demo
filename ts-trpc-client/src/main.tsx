import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ExecutionEngineService } from './ExecutionEngineService.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App
      executionEngineService={new ExecutionEngineService('http://localhost:3000')}
    />
  </React.StrictMode>,
)
