import React, { useState } from 'react'; 

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // State for current slide index

  const prevSlide = () => {
    // Go to previous slide, wrap around to last if at first slide
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    // Go to next slide, wrap around to first if at last slide
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-96 overflow-hidden"> {/* Carousel container */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Slide transition
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full flex-shrink-0 relative h-96"> {/* Slide item */}
            <img src={image.image} alt={image.title} className="w-full h-full object-cover" /> {/* Slide image */}
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
              <h2 className="text-lg">{image.title}</h2>
              <p className="text-sm">{image.location}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(image.location)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Get Directions
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={prevSlide} // Previous slide button
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={nextSlide} // Next slide button
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
