import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Features from './components/Features';
import IdealUses from './components/IdealUses';
import Distribution from './components/Distribution';
import Gallery from './components/Gallery';
import TransitMap from './components/TransitMap';
import GoogleTransitMap from './components/GoogleTransitMap';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
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
          <TransitMap />
          <GoogleTransitMap />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </HashRouter>
  );
}

export default App;
