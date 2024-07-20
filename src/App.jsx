/* eslint-disable react/no-children-prop */

import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPanel from "./views/Home/home";
import LoginPage from "./views/auth/login";
import SignupPage from "./views/auth/signup";
import PricingPage from "./views/pricing/Pricing";
import AboutPage from "./views/about/about";
import DocumentationPage from "./views/docs/documentation";
import ProtectedRoute from "./auth/validator";
import Sidebar from "./components/Navigations/NavDrawer";
import SettingsPage from "./views/settings/settings";
import LocationsDataPage from "./views/Locations/LocationsPage";
import UserDashboard from "./views/Home/userDashboard";
import UserProfile from "./views/profile/userProfile";
import UserDevices from "./views/devices/UserDevices";
import "./App.css";

function App() {
  return (
    
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<MainPanel />} />
            <Route path="/docs/installation" element={<DocumentationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Sidebar children={<UserDashboard />} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <Sidebar children={<UserProfile />} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/devices"
              element={
                <ProtectedRoute>
                  <Sidebar children={<UserDevices />} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/locations"
              element={
                <ProtectedRoute>
                  <Sidebar children={<LocationsDataPage />} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Sidebar children={<SettingsPage />} />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
   
  );
}

export default App;
