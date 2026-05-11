import React from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Features from './components/Features';
import IdealUses from './components/IdealUses';
import Distribution from './components/Distribution';
import Gallery from './components/Gallery';
import LocationMap from './components/LocationMap';
import InvestmentCalc from './components/InvestmentCalc';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Navbar />
        <main>
          <Hero />
          <Overview />
          <Features />
          <IdealUses />
          <Distribution />
          <Gallery />
          <LocationMap />
          <InvestmentCalc />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </HashRouter>
  );
}

export default App;
