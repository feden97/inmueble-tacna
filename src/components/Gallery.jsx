import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Gallery.css';

// TODO: reemplazar URLs con fotos reales del inmueble.
const photos = [
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
];

export default function Gallery() {
  const [sectionRef, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 80) nextPhoto();
    if (delta < -80) prevPhoto();
  };

  return (
    <section id="galeria" className="section-padding" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Galería</h2>

        <div className={`gallery-wrapper ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <div className="hidden-mobile gallery-grid-desktop">
            <div className="gallery-main" onClick={() => openLightbox(0)}>
              <img src={photos[0]} alt="Principal" loading="lazy" />
            </div>
            <div className="gallery-side">
              <div className="gallery-sub" onClick={() => openLightbox(1)}>
                <img src={photos[1]} alt="Foto 2" loading="lazy" />
              </div>
              <div className="gallery-sub gallery-more" onClick={() => openLightbox(2)}>
                <img src={photos[2]} alt="Foto 3" loading="lazy" />
                <div className="gallery-more-overlay">Ver todas las fotos -&gt;</div>
              </div>
            </div>
          </div>

          <div className="md:hidden gallery-carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="carousel-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {photos.map((src, i) => (
                <div key={i} className="carousel-slide" onClick={() => openLightbox(i)}>
                  <img src={src} alt={`Foto ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
            <button className="carousel-btn left" onClick={prevPhoto} aria-label="Foto anterior">
              <ChevronLeft size={24} />
            </button>
            <button className="carousel-btn right" onClick={nextPhoto} aria-label="Foto siguiente">
              <ChevronRight size={24} />
            </button>
            <div className="carousel-dots">
              {photos.map((_, i) => (
                <div key={i} className={`dot ${currentIndex === i ? 'active' : ''}`} onClick={() => setCurrentIndex(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Cerrar">
            <X size={32} />
          </button>

          <div className="lightbox-counter">
            {currentIndex + 1} / {photos.length}
          </div>

          <button className="lightbox-nav left" onClick={prevPhoto} aria-label="Anterior">
            <ChevronLeft size={40} />
          </button>

          <img
            src={photos[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            className="lightbox-image"
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />

          <button className="lightbox-nav right" onClick={nextPhoto} aria-label="Siguiente">
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
