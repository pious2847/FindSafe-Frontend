/* eslint-disable react/no-children-prop */

import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPanel from "./views/Home/home";
import LoginPage from "./views/auth/login";
import SignupPage from "./views/auth/signup";
import VerifyOTP from "./views/auth/verify-otp";
import ForgotPassword from "./views/auth/forgot-password";
import VerifyResetOTP from "./views/auth/verify-reset-otp";
import ResetPassword from "./views/auth/reset-password";
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
import { ToastContainer } from "./components/ui/enhanced-toast";
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
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Sidebar />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
          <ToastContainer />
        </Router>
      </ThemeProvider>
  );
}

export default App;
