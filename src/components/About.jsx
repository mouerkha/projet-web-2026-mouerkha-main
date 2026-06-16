import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../../img_profail.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.profile-placeholder', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.about-copy > *', {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="section-content">
        <div className="about-layout">
          <img src={profileImage} alt="Zaki Mouerkha profile" className="profile-placeholder" />

          <div className="about-copy">
            <h2 className="section-heading">About Me</h2>
            <p>
              I am a Computer  student in Computer Science , who loves building clean, interactive
              web experiences and also creating game mechanics with C++ and creating site web .
            </p>
            <p>
              I am especially passionate about Web Development and C++ Game
              Development, always trying to mix solid performance with engaging UI.
            </p>

            <h3 className="resume-subheading">Contact Details</h3>
            <div className="contact-details">
              <p>
                <strong>Name:</strong> Ouerkha  Mobarak
              </p>
              <p>
                <strong>Location:</strong> Ourika, Morocco
              </p>
              <p>
                <strong>Email:</strong> m.ouerkha2238@uca.ac.ma
              </p>
            </div>

            <a href="#" className="btn download-btn">
              &#8681; Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
