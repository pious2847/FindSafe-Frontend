import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPanel from "./views/Home/home";
import LoginPage from "./views/auth/login";
import "./App.css";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainPanel />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;