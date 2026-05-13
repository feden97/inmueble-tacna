import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { property } from '../data';
import './Navbar.css';

const navLinks = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'detalles', label: 'Detalles' },
  { id: 'distribucion', label: 'Distribución' },
  { id: 'galeria', label: 'Galería' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'inversion', label: 'Inversión' },
  { id: 'contacto', label: 'Contacto' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3, rootMargin: "-100px 0px -40% 0px" });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 70; // offset for sticky header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const whatsappLink = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}`;

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Inmueble en Venta
          </div>

          <div className="navbar-links hidden-mobile">
            {navLinks.map(link => (
              <button
                key={link.id}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="navbar-actions">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm hidden-mobile">
              <WhatsAppIcon size={18} /> WhatsApp
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="nav-icon-mobile md:hidden text-gold">
              <WhatsAppIcon size={24} />
            </a>
            <button className="menu-btn md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="navbar-logo">Inmueble en Venta</div>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <div className="drawer-links">
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`drawer-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
      {isMenuOpen && <div className="drawer-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
}
