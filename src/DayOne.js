import React, { useState , useMemo, memo } from 'react';
import yesImage from './images/myaowl-heart.gif';
import AdventCalendar from './AdventCalendar';
import './App.css';

// Floating Hearts component - isolated to prevent re-renders
const FloatingHearts = memo(() => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 0.5 + Math.random(), // Adjust this: lower = faster, higher = slower
      size: 10 + Math.random() * 15,
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


function App() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [daysUntilValentine] = useState(0);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'advent'




  const handleYesClick = () => {
    setSelectedButton('yes');
    setCurrentPage('advent');
  };


  // Advent Calendar Page
  if (currentPage === 'advent') {
    return <AdventCalendar daysUntilValentine={daysUntilValentine} />;
  }

  // Home Page
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
          <h1 className="main-title">Day One</h1>
          <svg className="heart-icon header-heart-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <p className="subtitle"> I LOOOOOOOOOOVEEEEEEE YOOOOUUUUUUU</p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Image Container */}
        <div className="image-container">
          <svg className="heart-icon decorative-heart-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <div className="second-image-frame">
            <img src={yesImage} alt="" className="second-image" />
          </div>
          <svg className="heart-icon decorative-heart-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
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
            Next 
          </button>
        </div>
        
      </main>
    </div>
  );
}

export default App;
