import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Share2 } from 'lucide-react';
import { property } from '../data';
import './FloatingActions.css';

export default function FloatingActions() {
  const [showShareToast, setShowShareToast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = `https://wa.me/${property.contactoWhatsapp.replace(/\+/g, '')}`;
  const phoneLink = `tel:${property.contactoWhatsapp}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.titulo,
          text: property.descripcionCorta,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {showShareToast && (
        <div className="toast-notification fade-in-up visible">
          ¡Link copiado al portapapeles!
        </div>
      )}

      {/* Share Button (Desktop & Mobile, bottom left) */}
      <button className="fab fab-share" onClick={handleShare} aria-label="Compartir">
        <Share2 size={24} />
      </button>

      {/* Floating WhatsApp Button (Desktop bottom right, Mobile above bottom bar) */}
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`fab fab-whatsapp animate-pulse ${isScrolled ? 'visible' : ''}`}
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Mobile Bottom Action Bar */}
      <div className="mobile-bottom-bar md:hidden">
        <a href={phoneLink} className="bottom-bar-btn btn-phone">
          <Phone size={20} /> Llamar
        </a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bottom-bar-btn btn-wa">
          <MessageCircle size={20} /> WhatsApp
        </a>
      </div>
    </>
  );
}
