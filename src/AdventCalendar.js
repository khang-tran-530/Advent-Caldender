import React, { useState, useMemo, memo } from 'react';
import './App.css';

// Floating Hearts component
const FloatingHearts = memo(() => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 10 + Math.random() * 8,
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

function AdventCalendar({ daysUntilValentine }) {
  const [unlockedDays, setUnlockedDays] = useState([1]);

  const handleDayClick = (day) => {
    if (unlockedDays.includes(day)) {
      // Day is already unlocked, could show content here
      console.log(`Day ${day} clicked`);
    }
  };

  const getDayStatus = (day) => {
    if (unlockedDays.includes(day)) {
      return 'open';
    } else if (day === Math.max(...unlockedDays) + 1) {
      return 'next';
    } else {
      return 'locked';
    }
  };

  return (
    <div className="app advent-page">
      <FloatingHearts />
      <header className="advent-header">
        <svg className="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <h1 className="advent-title">Our 7 Days of Love</h1>
        <span className="advent-progress">{unlockedDays.length}/7 Days</span>
      </header>

      <div className="advent-countdown-section">
        <h2 className="advent-countdown-title">Valentine's Countdown</h2>
        <p className="advent-countdown-subtitle">Starting the journey...</p>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(unlockedDays.length / 7) * 100}%` }}
          ></div>
        </div>
        <p className="advent-instruction">Tap Day {Math.max(...unlockedDays)} to reveal your surprise.</p>
      </div>

      <div className="advent-calendar-grid">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => {
          const status = getDayStatus(day);
          return (
            <div
              key={day}
              className={`advent-day-card ${status}`}
              onClick={() => handleDayClick(day)}
            >
              {status === 'open' && (
                <div className="day-open-badge">OPEN</div>
              )}
              <div className={`day-icon ${status}`}>
                {status === 'open' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="8" width="18" height="12" rx="2"/>
                    <path d="M12 8V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/>
                    <path d="M8 12h8"/>
                  </svg>
                ) : status === 'next' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="8" width="18" height="12" rx="2"/>
                    <path d="M12 8V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                )}
              </div>
              <div className={`day-label ${status}`}>Day {day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdventCalendar;
