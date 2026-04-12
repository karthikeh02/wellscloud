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

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff' }}>
      {/* Header */}
      <TopBar />
      <MainNav />

      {/* Hero: Sign-On overlays Banner */}
      <HeroBanner />

      {/* Product Cards + Rates */}
      <ProductCards />

      {/* Large Promo */}
      <PromoBanner />

      {/* Financial Guidance Cards */}
      <GuidanceCards />

      {/* Fargo */}
      <FargoSection />

      {/* Community */}
      <CommunitySection />

      {/* Footer */}
      <FooterHelp />
      <FooterLinks />
      <FooterDisclaimer />
    </div>
  );
}

export default App;
