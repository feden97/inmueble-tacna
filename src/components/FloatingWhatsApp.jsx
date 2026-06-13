import { property } from '../data';
import WhatsAppIcon from './WhatsAppIcon';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const phoneNumber = property.contactoWhatsapp.replace(/\+/g, '');
  const whatsappText = encodeURIComponent(
    `Hola, me interesa el inmueble de ${property.distrito} (${property.areaConstruidaM2}m2, ${property.precioTexto})`
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappText}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon size={32} />
    </a>
  );
}
