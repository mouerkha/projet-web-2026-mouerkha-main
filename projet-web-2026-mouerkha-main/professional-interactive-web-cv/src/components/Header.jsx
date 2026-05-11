import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src="img_profail.jpg" alt="Profile" className="profile-picture" />
      <h1 className="full-name"></h1>
      <h2 className="title">Your Title</h2>
      <div className="social-links">
        <a href="mailto:your.email@example.com">Email</a>
        <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </header>
  );
};

export default Header;