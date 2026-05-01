import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { LandingPage } from '../pages/LandingPage';
import { MapPage } from '../pages/MapPage';
import LoginPage from '../pages/LoginPage';
import { Toaster } from 'sonner';
import { SignUpPage } from '../pages/SignUpPage';
import Profile from '../pages/Profile';
import ResetPassword from '@/pages/ResetPassword';


function App() {
  return (
    <AppLayout>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </AppLayout>
  );
}

export default App;