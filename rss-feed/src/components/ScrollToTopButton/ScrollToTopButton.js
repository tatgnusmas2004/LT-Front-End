import React from 'react';
import './ScrollToTopButton.css'; // Add some basic CSS for the button
import $ from 'jquery';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  };

  return (
    <div className="scroll-to-top">
      <button onClick={scrollToTop} className="scroll-button">
        ↑
      </button>
    </div>
  );
};

export default ScrollToTopButton;
