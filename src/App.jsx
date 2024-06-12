import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import MainPanel from './views/Home/home'
import LoginPage from './views/auth/login';
import './App.css'

function App() {

  return (
    <>
    <Router>

    
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={MainPanel} />
    </ThemeProvider>
    </Router>
    </>
  )
}

export default App
