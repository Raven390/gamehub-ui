import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import DemoBlock from './DemoBlock';
import Footer from './Footer';

const LandingPage: React.FC = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <DemoBlock />
    </main>
    <Footer />
  </>
);

export default LandingPage;
