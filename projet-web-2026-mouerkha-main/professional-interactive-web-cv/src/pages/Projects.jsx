import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projectData from '../assets/data.json';

const Projects = () => {
  return (
    <div className="projects">
      <h2>My Projects</h2>
      <div className="project-list">
        {projectData.projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            title={project.title} 
            description={project.description} 
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;