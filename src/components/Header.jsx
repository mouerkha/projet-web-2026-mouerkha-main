import { useEffect } from 'react';
import $ from 'jquery';
import { Typewriter } from 'react-simple-typewriter';

export default function Header() {
  useEffect(() => {
    const onChevronClick = (event) => {
      event.preventDefault();
      const aboutSection = $('#about');
      if (aboutSection.length) {
        $('html, body').animate(
          { scrollTop: aboutSection.offset().top },
          850
        );
      }
    };

    $('.scroll-chevron').on('click', onChevronClick);

    return () => {
      $('.scroll-chevron').off('click', onChevronClick);
    };
  }, []);

  return (
    <header className="header" id="home">
      <div className="header-inner" style={{ position: 'relative', zIndex: 2 }}>
        <h1 className="header-title glitch-title">
          <Typewriter
            words={['Ouerkha Mobarak']}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={95}
            deleteSpeed={40}
            delaySpeed={1200}
          />
        </h1>
        <p className="header-subtitle terminal-subtitle">
          <span className="prompt">$</span>{' '}
          <Typewriter
            words={['Computer Science Student (S4) AND Full-Stack Web Developer']}
            loop={1}
            cursor={false}
            typeSpeed={45}
            delaySpeed={1000}
          />
        </p>
        <div className="header-actions">
          <a href="#portfolio" className="btn btn-light">
            Projects
          </a>
          <a
            href="https://github.com/mouerkha"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
        </div>
      </div>

      <button
        type="button"
        className="scroll-chevron"
        aria-label="Scroll to About"
        style={{ zIndex: 2 }}
      >
        v
      </button>
    </header>
  );
}
