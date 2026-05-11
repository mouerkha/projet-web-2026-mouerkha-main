import React, { useEffect } from 'react';
import $ from 'jquery';

const Contact = () => {
  useEffect(() => {
    $('#contact-form').on('submit', function(event) {
      event.preventDefault();
      // Simple validation
      const name = $('#name').val();
      const email = $('#email').val();
      const message = $('#message').val();
      if (name && email && message) {
        alert('Form submitted successfully!');
      } else {
        alert('Please fill in all fields.');
      }
    });
  }, []);

  return (
    <div className="contact">
      <h2>Contact Me</h2>
      <form id="contact-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;