import React from 'react';

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

const styles = `
  .splash-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .splash-content {
    text-align: center;
  }

  .welcome-text {
    color: #0066cc;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 0.5rem;
    margin-bottom: 2rem;
    text-shadow: 0 0 10px rgba(0, 102, 204, 0.2);
    animation: glow 2s ease-in-out infinite alternate;
  }

  .dots-container {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .dot {
    width: 12px;
    height: 12px;
    background-color: #0066cc;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 102, 204, 0.5);
  }

  .dot:nth-child(1) {
    animation: jump 1s ease-in-out infinite;
  }

  .dot:nth-child(2) {
    animation: jump 1s ease-in-out infinite 0.2s;
  }

  .dot:nth-child(3) {
    animation: jump 1s ease-in-out infinite 0.4s;
  }

  .dot:nth-child(4) {
    animation: jump 1s ease-in-out infinite 0.6s;
  }

  @keyframes jump {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 10px rgba(0, 102, 204, 0.2);
    }
    to {
      text-shadow: 0 0 20px rgba(0, 102, 204, 0.4),
                   0 0 30px rgba(0, 102, 204, 0.3);
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default SplashScreen;