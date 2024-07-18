import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
        // doc trang thai tu localStorage khi components duoc mount
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode !== null ? JSON.parse(savedDarkMode) : false;
  });

   useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    const darkColor = '#DBE1E1';
    const lightColor = '#000';
    const classArray = ['box-title-text', 'content-snippet', 'cate-name', 'footer-content', 'footer-content a', 'themeToggleBtn', 'pagination'];

    const updateElementStyles = (classNames, darkMode) => {
      classNames.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(element => {
          element.style.color = darkMode ? darkColor : lightColor;
        });
      });
    };

    if (darkMode) {
      document.body.style.backgroundColor = '#333';
      document.body.style.color = darkColor;
      document.querySelectorAll('.nav-dark-mode').forEach(navbar => {
        navbar.style.backgroundColor = '#333';
       });
    } else {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = lightColor;
      document.querySelectorAll('.nav-dark-mode').forEach(navbar => {
        navbar.style.backgroundColor = '#fff';
       });
    }

    updateElementStyles(classArray, darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div>
      <button className='themeToggleBtn' onClick={toggleTheme}>
        {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
      </button>
    </div>
  );
};

export default ThemeToggle;
