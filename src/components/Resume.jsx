import { useEffect } from 'react';
import $ from 'jquery';

const skills = [
  { name: 'C++', level: 90 },
  { name: 'JavaScript', level: 88 },
  { name: 'C', level: 84 },
  { name: 'SQL', level: 75 },
];

export default function Resume() {
  useEffect(() => {
    const animateBars = () => {
      $('.skill-progress').each(function animateSingleBar(index) {
        const target = Number($(this).data('progress')) || 0;
        const delay = index * 200;
        $(this).delay(delay).stop(true).animate({ width: `${target}%` }, 1500, 'swing');
      });
    };

    const resetBars = () => {
      $('.skill-progress').css('width', '0');
    };

    const handleScroll = () => {
      const section = $('#resume');
      if (!section.length || section.data('animated')) return;

      const triggerPoint = $(window).scrollTop() + $(window).height() * 0.85;
      if (triggerPoint >= section.offset().top) {
        animateBars();
        section.data('animated', true);
      }
    };

    resetBars();
    handleScroll();
    $(window).on('scroll', handleScroll);

    return () => {
      $(window).off('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="resume" id="resume">
      <div className="section-content">
        <h2 className="section-heading">Resume</h2>

        <div className="resume-grid">
          <div>
            <h3 className="resume-subheading">Education</h3>

            <article className="education-item">
              <h4>Bachelor in Informatique</h4>
              <p>Cadi Ayyad University - S4</p>
            </article>

            <article className="education-item">
              <h4>Web Development Focus</h4>
              <p>Frontend projects with React, jQuery, and modern CSS</p>
            </article>
          </div>

          <div>
            <h3 className="resume-subheading">Skills</h3>
            {skills.map((skill) => (
              <div className="skill-item" key={skill.name}>
                <div className="skill-label">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-progress" data-progress={skill.level} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
