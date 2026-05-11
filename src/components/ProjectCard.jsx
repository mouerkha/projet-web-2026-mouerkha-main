import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <Tilt
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      perspective={1200}
      transitionSpeed={1200}
      glareEnable
      glareMaxOpacity={0.18}
      glareColor="#ffffff"
      glarePosition="all"
      scale={1.02}
      className="tilt-wrapper"
    >
      <motion.article
        className="project-card futuristic-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="project-image">
          {project.videoSrc && !videoError ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="project-video"
              src={project.videoSrc}
              onError={() => setVideoError(true)}
            />
          ) : (
            <span className="project-image-label">{project.imageLabel || project.title}</span>
          )}
        </div>
        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link github-link"
              >
                🐙 GitHub
              </a>
            )}
          </div>
        </div>
        <span className="card-glow" />
      </motion.article>
    </Tilt>
  );
}
