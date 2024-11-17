import './App.css'
import AuthenticatedApp from './pages/AuthenticatedApp'
import UnAuthenticatedApp from './pages/UnAuthenticatedApp'
import { useAuth } from './contexts/authentication'

function App() {
  const auth = useAuth()
  return (
    auth.isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />
  )
}

export default App
