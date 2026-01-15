import React, { useState, useEffect, useMemo, memo } from 'react';
import snoopyImage from './images/snoopy.png'; 
import './App.css';

// Floating Hearts component - isolated to prevent re-renders
const FloatingHearts = memo(() => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 10 + Math.random() * 8, // Adjust this: lower = faster, higher = slower
      size: 20 + Math.random() * 30,
      opacity: 0.3 + Math.random() * 0.4
    }));
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="floating-heart"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255, 23, 68, 0.6)"
          strokeWidth="1.5"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity
          }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ))}
    </div>
  );
});

FloatingHearts.displayName = 'FloatingHearts';

// Separate NoButton component to prevent re-renders from affecting hearts
const NoButton = memo(({ onHover, onClick, isSelected, position }) => {
  return (
    <>
      {position.position === 'fixed' ? (
        <div className="button-placeholder" aria-hidden="true"></div>
      ) : (
        <button 
          className={`button button-no ${isSelected ? 'selected' : ''}`}
          onMouseEnter={onHover}
          onClick={onClick}
        >
          No
        </button>
      )}
      {position.position === 'fixed' && (
        <button 
          className={`button button-no ${isSelected ? 'selected' : ''}`}
          onMouseEnter={onHover}
          onClick={onClick}
          style={position}
        >
          No
        </button>
      )}
    </>
  );
});

NoButton.displayName = 'NoButton';

function App() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [daysUntilValentine, setDaysUntilValentine] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 'auto', left: 'auto', position: 'static' });

  useEffect(() => {
    const calculateDaysUntilValentine = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      
      // Set Valentine's Day for this year
      let valentineDate = new Date(currentYear, 1, 14); // Month is 0-indexed, so 1 = February
      
      // If Valentine's Day has already passed this year, use next year
      if (today > valentineDate) {
        valentineDate = new Date(currentYear + 1, 1, 14);
      }
      
      // Calculate the difference in days
      const timeDiff = valentineDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      
      setDaysUntilValentine(daysDiff);
    };

    // Calculate immediately
    calculateDaysUntilValentine();

    // Update every hour to ensure accuracy
    const interval = setInterval(calculateDaysUntilValentine, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  const handleYesClick = () => {
    setSelectedButton('yes');
  };

  const handleNoHover = () => {
    // Generate random position within viewport
    const maxX = window.innerWidth - 200; // Account for button width
    const maxY = window.innerHeight - 60; // Account for button height
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    setNoButtonPosition({
      position: 'fixed',
      top: `${Math.max(20, randomY)}px`,
      left: `${Math.max(20, randomX)}px`,
      zIndex: 1000
    });
  };

  const handleNoClick = () => {
    setSelectedButton('no');
  };

  return (
    <div className="app">
      {/* Floating Hearts Background */}
      <FloatingHearts />
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <svg className="heart-icon header-heart-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h1 className="main-title">Valentine's 2026</h1>
          <svg className="heart-icon header-heart-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <p className="subtitle">{daysUntilValentine} {daysUntilValentine === 1 ? 'DAY' : 'DAYS'} TILL VALENTINE'S</p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Teddy Bear Image Container */}
        <div className="image-container">
          <svg className="heart-icon decorative-heart-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <div className="image-frame">
            <img src={snoopyImage} alt="Snoopy with heart" className="main-image" />
          </div>
          <svg className="heart-icon decorative-heart-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>

        {/* Question Section */}
        <div className="question-section">
          <h2 className="question">Will you be my Valentine?</h2>
          <p className="question-subtitle">Every day is a gift when I'm with you ✨</p>
        </div>

        {/* Buttons */}
        <div className="buttons-container">
          <button 
            className={`button button-yes ${selectedButton === 'yes' ? 'selected' : ''}`}
            onClick={handleYesClick}
          >
            Yes! ✨
          </button>
          <NoButton
            onHover={handleNoHover}
            onClick={handleNoClick}
            isSelected={selectedButton === 'no'}
            position={noButtonPosition}
          />
        </div>
        
      </main>
    </div>
  );
}

export default App;
