import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Play, ZoomIn, ZoomOut } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { galleryMedia } from '../data';
import './Gallery.css';

export default function Gallery() {
  const [sectionRef, isVisible] = useIntersectionObserver({ triggerOnce: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef(0);

  const mediaItems = galleryMedia || [];
  const totalItems = mediaItems.length;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setIsZoomed(false);
    if (totalItems > 0) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    setIsZoomed(false);
    if (totalItems > 0) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 80) nextPhoto();
    if (delta < -80) prevPhoto();
  };

  if (totalItems === 0) return null;

  // Renderizar miniatura (imagen o primer fotograma de video)
  const renderThumbnail = (item, index, isLarge = false) => {
    const isVideo = item.type === 'video';
    return (
      <div 
        className={`gallery-item-wrapper ${isLarge ? 'main-item' : 'sub-item'} ${isVideo ? 'video-item' : ''}`}
        onClick={() => openLightbox(index)}
      >
        {isVideo ? (
          <>
            <video 
              src={item.url} 
              preload="metadata" 
              className="gallery-thumbnail-video" 
              muted 
              playsInline
            />
            <div className="play-button-overlay">
              <Play size={isLarge ? 48 : 32} fill="currentColor" />
            </div>
          </>
        ) : (
          <img 
            src={item.url} 
            alt={item.alt || `Foto ${index + 1}`} 
            loading="lazy" 
            className="gallery-thumbnail-img"
          />
        )}
      </div>
    );
  };

  return (
    <section id="galeria" className="section-padding" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header">
          <h2 className="section-title">Galería</h2>
          <span className="gallery-badge">Fotos reales de la propiedad</span>
        </div>

        <div className={`gallery-wrapper ${isVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
          
          {/* Vista de Escritorio */}
          <div className="hidden-mobile">
            {totalItems === 1 ? (
              // Solo 1 imagen
              <div className="gallery-single-layout">
                {renderThumbnail(mediaItems[0], 0, true)}
              </div>
            ) : totalItems === 2 ? (
              // Exactamente 2 imágenes (Díptico)
              <div className="gallery-diptych-layout">
                {renderThumbnail(mediaItems[0], 0, true)}
                {renderThumbnail(mediaItems[1], 1, true)}
              </div>
            ) : totalItems === 3 || totalItems === 4 ? (
              // 3 o 4 imágenes (Tríptico)
              <div className="gallery-grid-desktop-3">
                <div className="gallery-main">
                  {renderThumbnail(mediaItems[0], 0, true)}
                </div>
                <div className="gallery-side">
                  <div className="gallery-sub-container">
                    {renderThumbnail(mediaItems[1], 1, false)}
                  </div>
                  <div className="gallery-sub-container gallery-more">
                    {renderThumbnail(mediaItems[2], 2, false)}
                    {totalItems > 3 && (
                      <div className="gallery-more-overlay" onClick={() => openLightbox(2)}>
                        <span>Ver todas las fotos (+{totalItems - 3})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // 5 o más imágenes (Grid Premium tipo Airbnb de 5 fotos)
              <div className="gallery-grid-desktop-5">
                <div className="gallery-grid-item item-0">
                  {renderThumbnail(mediaItems[0], 0, true)}
                </div>
                <div className="gallery-grid-item item-1">
                  {renderThumbnail(mediaItems[1], 1, false)}
                </div>
                <div className="gallery-grid-item item-2">
                  {renderThumbnail(mediaItems[2], 2, false)}
                </div>
                <div className="gallery-grid-item item-3">
                  {renderThumbnail(mediaItems[3], 3, false)}
                </div>
                <div className="gallery-grid-item gallery-more item-4">
                  {renderThumbnail(mediaItems[4], 4, false)}
                  {totalItems > 5 && (
                    <div className="gallery-more-overlay" onClick={() => openLightbox(4)}>
                      <span>Ver más fotos (+{totalItems - 5})</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Vista Móvil (Carrusel) */}
          <div className="md:hidden gallery-carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="carousel-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {mediaItems.map((item, i) => (
                <div key={i} className="carousel-slide" onClick={() => openLightbox(i)}>
                  {item.type === 'video' ? (
                    <div className="carousel-video-slide">
                      <video src={item.url} preload="metadata" muted playsInline />
                      <div className="play-button-overlay">
                        <Play size={40} fill="currentColor" />
                      </div>
                    </div>
                  ) : (
                    <img src={item.url} alt={item.alt || `Foto ${i + 1}`} loading="lazy" />
                  )}
                </div>
              ))}
            </div>
            {totalItems > 1 && (
              <>
                <button className="carousel-btn left" onClick={prevPhoto} aria-label="Anterior">
                  <ChevronLeft size={24} />
                </button>
                <button className="carousel-btn right" onClick={nextPhoto} aria-label="Siguiente">
                  <ChevronRight size={24} />
                </button>
                {totalItems <= 10 ? (
                  <div className="carousel-dots">
                    {mediaItems.map((_, i) => (
                      <div key={i} className={`dot ${currentIndex === i ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }} />
                    ))}
                  </div>
                ) : (
                  <div className="carousel-counter-mobile">
                    {currentIndex + 1} / {totalItems}
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>

      {/* Lightbox / Visor de pantalla completa */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Cerrar">
            <X size={32} />
          </button>

          {mediaItems[currentIndex].type !== 'video' && (
            <button 
              className="lightbox-zoom-toggle" 
              onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }} 
              aria-label={isZoomed ? "Reducir" : "Ampliar"}
            >
              {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
            </button>
          )}

          <div className="lightbox-counter">
            {currentIndex + 1} / {totalItems}
          </div>

          <div className="lightbox-caption">
            <span>{mediaItems[currentIndex].alt}</span>
            {mediaItems[currentIndex].type !== 'video' && (
              <span className="zoom-hint"> — Toca la imagen para {isZoomed ? 'reducir' : 'ampliar'}</span>
            )}
          </div>

          {totalItems > 1 && (
            <>
              <button className="lightbox-nav left" onClick={prevPhoto} aria-label="Anterior">
                <ChevronLeft size={40} />
              </button>
              <button className="lightbox-nav right" onClick={nextPhoto} aria-label="Siguiente">
                <ChevronRight size={40} />
              </button>
            </>
          )}

          <div className={`lightbox-content ${isZoomed ? 'zoomed' : ''}`} onClick={(e) => { e.stopPropagation(); if (isZoomed) setIsZoomed(false); }}>
            {mediaItems[currentIndex].type === 'video' ? (
              <video
                src={mediaItems[currentIndex].url}
                controls
                autoPlay
                className="lightbox-video"
                playsInline
              />
            ) : (
              <img
                src={mediaItems[currentIndex].url}
                alt={mediaItems[currentIndex].alt || `Foto ${currentIndex + 1}`}
                className={`lightbox-image ${isZoomed ? 'zoomed' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
