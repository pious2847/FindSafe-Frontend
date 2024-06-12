import { ThemeProvider } from './components/theme-provider'
import MainPanel from './views/Home/home'
import './App.css'

function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <MainPanel/>
    </ThemeProvider>
    </>
  )
}

export default App
