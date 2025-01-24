import React from 'react';

const LoadingDots = ({ className = "", dotSize = 12, gap = 16 }) => {
  return (
    <div className={`loading-container ${className}`}>
      <div
        className="dots-wrapper"
        style={{ gap: `${gap}px` }} // Set horizontal gap
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{
              animationDelay: `${i * 0.2}s`,
              width: `${dotSize}px`,
              height: `${dotSize}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles = `
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }

  .dots-wrapper {
    display: flex;
    /* Gap dynamically set via inline styles */
  }

  .dot {
    background-color: rgba(0, 81, 255, 0.5);
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.5);
    animation: bounce 1.5s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(-24px);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
`;


// Inject styles when in browser environment
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default LoadingDots;
