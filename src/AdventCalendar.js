import React, { useMemo, useEffect, useState, memo } from "react";
import DayOne from "./DayOne";
import "./App.css";

/**
 * Unlock schedule:
 * Day 1 -> Feb 8
 * Day 2 -> Feb 9
 * ...
 * Day 6 -> Feb 13
 */
const START_MONTH_INDEX = 1; // February (0=Jan, 1=Feb, ...)
const START_DAY_OF_MONTH = 8;
const END_DAY_OF_MONTH = 13;
const TOTAL_DAYS = END_DAY_OF_MONTH - START_DAY_OF_MONTH + 1; // 6

// Floating Hearts component background
const FloatingHearts = memo(() => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 10 + Math.random() * 8,
      size: 10 + Math.random() * 15,
      opacity: 0.3 + Math.random() * 0.4,
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
            opacity: heart.opacity,
          }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ))}
    </div>
  );
});

FloatingHearts.displayName = "FloatingHearts";

function AdventCalendar({ daysUntilValentine }) {
  // Use local constructor for testing (prevents timezone shifting)
  //const [now, setNow] = useState(() => new Date(2025, 1, 9)); // Feb 9, 2025 (local)
  const [now, setNow] = useState(() => new Date()); // real current date

  // simple page switch (no React Router)
  const [currentPage, setCurrentPage] = useState("calendar"); // "calendar" | "day1"

  // Update every 30 seconds (keeps it accurate in real mode)
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Which days are unlocked based on date
  const unlockedDays = useMemo(() => {
    const month = now.getMonth();
    const day = now.getDate();

    // Only unlock during February
    if (month !== START_MONTH_INDEX) return [];

    // Feb 8 => 1 day unlocked, Feb 9 => 2, ...
    const unlockedCount = Math.min(
      Math.max(day - START_DAY_OF_MONTH + 1, 0),
      TOTAL_DAYS
    );

    return Array.from({ length: unlockedCount }, (_, i) => i + 1);
  }, [now]);

  // Visual status: stays "open" forever once date has passed
  const getDayStatus = (dayNumber) => {
    if (unlockedDays.includes(dayNumber)) return "open";
    return "locked";
  };

  const unlockedCount = unlockedDays.length;

  // Click handler
  const handleDayClick = (dayNumber) => {
    const status = getDayStatus(dayNumber);
    if (status !== "open") return;

    // Day 1 routes to DayOne.js
    if (dayNumber === 1) {
      setCurrentPage("day1");
      return;
    }

    alert(`Day ${dayNumber} unlocked! Surprise revealed!`);
  };

  const progressPercent =
    TOTAL_DAYS === 0 ? 0 : Math.round((unlockedCount / TOTAL_DAYS) * 100);

  const subtitleText = (() => {
    if (typeof daysUntilValentine === "number") {
      return `${daysUntilValentine} day${
        daysUntilValentine === 1 ? "" : "s"
      } until Valentine’s 💌`;
    }

    if (now.getMonth() !== START_MONTH_INDEX) return "Unlocks Feb 8–13 💘";
    if (now.getDate() < START_DAY_OF_MONTH) return "First surprise unlocks Feb 8 💘";
    if (now.getDate() > END_DAY_OF_MONTH) return "All surprises unlocked 💖";
    return "One new surprise unlocks each day 💘";
  })();

  const instructionText = (() => {
    if (unlockedCount === 0) return `Come back on Feb ${START_DAY_OF_MONTH} 💘`;
    if (unlockedCount >= TOTAL_DAYS) return "All days are open 💖";
    return `Next unlock: Day ${unlockedCount + 1}`;
  })();

  // IMPORTANT: page switch happens AFTER hooks, BEFORE JSX return
  if (currentPage === "day1") {
    return <DayOne onBack={() => setCurrentPage("calendar")} />;
  }

  return (
    <div className="app advent-page">
      <FloatingHearts />

      <header className="advent-header">
        <svg
          className="heart-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>

        <h1 className="advent-title">Our {TOTAL_DAYS} Days of Love</h1>
        <span className="advent-progress">
          {unlockedCount}/{TOTAL_DAYS} Days
        </span>
      </header>

      <div className="advent-countdown-section">
        <h2 className="advent-countdown-title">Valentine's Countdown</h2>
        <p className="advent-countdown-subtitle">{subtitleText}</p>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="advent-instruction">{instructionText}</p>
      </div>

      <div className="advent-calendar-grid">
        {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((dayNumber) => {
          const status = getDayStatus(dayNumber);

          return (
            <div
              key={dayNumber}
              className={`advent-day-card ${status}`}
              onClick={() => handleDayClick(dayNumber)}
            >
              {status === "open" && <div className="day-open-badge">OPEN</div>}

              <div className={`day-icon ${status}`}>
                {status === "open" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="8" width="18" height="12" rx="2" />
                    <path d="M12 8V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
                    <path d="M8 12h8" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
              </div>

              <div className={`day-label ${status}`}>Day {dayNumber}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdventCalendar;