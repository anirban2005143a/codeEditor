import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const UserGallery = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    gsap.from(galleryRef.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      delay: 1.5,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={`https://via.placeholder.com/300?text=Post+${index + 1}`}
            alt={`Post ${index + 1}`}
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default UserGallery;