import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/Header/TopBar';
import MainNav from './components/Header/MainNav';
import HeroBanner from './components/Hero/HeroBanner';
import ProductCards from './components/QuickAccess/ProductCards';
import PromoBanner from './components/Promotions/PromoBanner';
import GuidanceCards from './components/Promotions/GuidanceCards';
import FargoSection from './components/Fargo/FargoSection';
import CommunitySection from './components/Community/CommunitySection';
import FooterHelp from './components/Footer/FooterHelp';
import FooterLinks from './components/Footer/FooterLinks';
import FooterDisclaimer from './components/Footer/FooterDisclaimer';
import ErrorBoundary from './components/ErrorBoundary';
import InstallPrompt from './components/InstallPrompt';

const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminClient = lazy(() => import('./pages/AdminClient'));

function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff' }}>
      <TopBar />
      <MainNav />
      <HeroBanner />
      <ProductCards />
      <PromoBanner />
      <GuidanceCards />
      <FargoSection />
      <CommunitySection />
      <FooterHelp />
      <FooterLinks />
      <FooterDisclaimer />
    </div>
  );
}

function LoadingFallback() {
  return <div className="wf-loading">Loading...</div>;
}

function App() {
  return (
    <ErrorBoundary>
      <InstallPrompt />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accounts" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/client/:id" element={<AdminClient />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
