const WHATSAPP_URL = "https://wa.me/919999999999?text=Hello%20PIPA%20Jewellery%2C%20I%20would%20like%20to%20enquire%20about%20your%20collection.";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-5 z-[70] inline-flex items-center justify-center rounded-full bg-[#111111] p-2.5 shadow-2xl transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background sm:bottom-24 sm:right-6"
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.472-.15-.671.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.787-1.48-1.758-1.654-2.055-.173-.298-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.52-.074-.15-.671-1.616-.92-2.213-.242-.579-.487-.5-.671-.51l-.572-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.482 0 1.466 1.065 2.882 1.213 3.08.149.198 2.1 3.205 5.088 4.495.711.308 1.266.492 1.699.63.714.227 1.365.195 1.878.118.573-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.174-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M20.52 3.48A11.91 11.91 0 0 0 12.003 0C5.383 0 .002 5.38.002 12c0 2.11.553 4.17 1.603 5.984L0 24l6.177-1.57A11.96 11.96 0 0 0 12 24c6.62 0 12-5.38 12-12a11.91 11.91 0 0 0-3.48-8.52zm-8.52 18.39a9.94 9.94 0 0 1-5.06-1.385l-.362-.214-3.664.932.978-3.57-.235-.367a9.96 9.96 0 1 1 8.343 4.604z" />
        </svg>
      </span>
    </a>
  );
}
