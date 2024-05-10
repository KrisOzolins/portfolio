import Image from 'next/image';
import { StaticImageData } from 'next/image';
import React, { useEffect, useRef } from 'react';

function Lightbox({ src, alt = '', show, onClose }: { src: StaticImageData; alt?: string; show: boolean; onClose: () => void }) {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const closeLightbox = (e: MouseEvent) => {
      if (imgRef.current && !imgRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    let eventListenerTimeout: number | undefined;

    // Only add the event listener if the lightbox is shown and add a delay to avoid immediate closing.
    if (show) {
      eventListenerTimeout = window.setTimeout(() => {
        document.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', handleEsc);
      }, 10);
    }

    return () => {
      if (eventListenerTimeout) {
        clearTimeout(eventListenerTimeout);
      }
      document.removeEventListener('click', closeLightbox);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 w-full h-full flex justify-center items-center z-[9999] bg-gray-dark/25 bg-opacity-75 backdrop-blur"
    >
      <Image ref={imgRef} src={src} alt={alt || '...'} className="max-w-full max-h-full border-8 border-white rounded shadow-xl" />
    </div>
  );
}

export default Lightbox;
