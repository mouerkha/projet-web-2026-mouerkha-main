import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Atlas Runner',
    imageLabel: 'Project Image',
    description: '2D Game developed in C++ and SFML.',
    videoSrc: 'vidio_atlas_renner.mp4',
    github: 'https://github.com/mouerkha/atlas-runner',
  },
  {
    title: 'DelicieuseFood',
    imageLabel: 'Project Image',
    description: 'E-commerce platform with Meta Ads and Stripe integration.',
    videoSrc: 'vidio_Food.mp4',
    github: 'https://github.com/MOBARAK-WII/mini-pro.git',
  },
];

export default function Portfolio() {
  const portfolioRef = useRef(null);

  useEffect(() => {
    if (!portfolioRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-grid > *', {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, portfolioRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="portfolio" id="portfolio" ref={portfolioRef}>
      <div className="section-content">
        <h2 className="section-heading">Portfolio</h2>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
