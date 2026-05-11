import React, { useEffect } from 'react';
import $ from 'jquery';
import Header from './Header';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import './App.css';

const App = () => {
  useEffect(() => {
    // jQuery animations and DOM manipulation
    $(document).ready(function() {
      // Example jQuery code
      $('.accordion').accordion();
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;