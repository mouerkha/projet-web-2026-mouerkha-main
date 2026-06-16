import { useEffect } from 'react';
import $ from 'jquery';
import { motion, useAnimationControls } from 'framer-motion';

export default function Contact() {
  const controls = useAnimationControls();

  useEffect(() => {
    const showError = (id, message) => {
      $(`#${id}`).text(message).show();
    };

    const hideError = (id) => {
      $(`#${id}`).hide();
    };

    const resetErrors = () => {
      hideError('name-error');
      hideError('email-error');
      hideError('message-error');
      hideError('form-success');
    };

    $('#name, #email, #message').on('input', function onInput() {
      $(this).removeClass('input-error');
      const errorId = `${$(this).attr('id')}-error`;
      hideError(errorId);
    });

    const onSubmit = async (event) => {
      event.preventDefault();
      resetErrors();

      const name = $('#name').val().toString().trim();
      const email = $('#email').val().toString().trim();
      const message = $('#message').val().toString().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;

      if (!name) {
        $('#name').addClass('input-error');
        showError('name-error', 'Name is required.');
        isValid = false;
      }

      if (!email) {
        $('#email').addClass('input-error');
        showError('email-error', 'Email is required.');
        isValid = false;
      } else if (!emailRegex.test(email)) {
        $('#email').addClass('input-error');
        showError('email-error', 'Please enter a valid email address.');
        isValid = false;
      }

      if (!message) {
        $('#message').addClass('input-error');
        showError('message-error', 'Message is required.');
        isValid = false;
      }

      if (!isValid) {
        await controls.start({
          x: [0, -10, 10, -8, 8, -4, 4, 0],
          transition: { duration: 0.45 },
        });
        return;
      }

      
      const $submitBtn = $('#contact-form button[type="submit"]');
      $submitBtn.prop('disabled', true).text('Sending...');

      try {
        const response = await fetch('https://formsubmit.co/ajax/m.ouerkha2238@uca.ac.ma', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `Portfolio Contact from ${name}`,
            _template: 'table',
          }),
        });

        const data = await response.json();

        if (data.success === 'true' || data.success === true || response.ok) {
          $('#contact-form')[0].reset();
          $('#form-success').text('✅ Message sent successfully! Thank you.').show();
        } else {
          $('#form-success')
            .css('color', '#ffb4b4')
            .text('❌ Failed to send. Please try again.')
            .show();
        }
      } catch (error) {
        $('#form-success')
          .css('color', '#ffb4b4')
          .text('❌ Network error. Please try again later.')
          .show();
      } finally {
        $submitBtn.prop('disabled', false).text('Submit');
      }
    };

    $('#contact-form').on('submit', onSubmit);

    return () => {
      $('#name, #email, #message').off('input');
      $('#contact-form').off('submit', onSubmit);
    };
  }, [controls]);

  return (
    <section className="contact" id="contact">
      <div className="section-content">
        <h2 className="section-heading">Contact</h2>
        <p>Tell me about your idea or collaboration request.</p>

        <motion.form
          id="contact-form"
          className="contact-form"
          animate={controls}
          initial={{ x: 0 }}
        >
          {}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input id="name" name="name" type="text" className="contact-input" placeholder="Your name" />
            <small id="name-error" className="field-error" />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input id="email" name="email" type="email" className="contact-input" placeholder="your@email.com" />
            <small id="email-error" className="field-error" />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="contact-textarea"
              placeholder="Your message..."
            />
            <small id="message-error" className="field-error" />
          </div>

          <button type="submit" className="btn submit-btn">
            Submit
          </button>

          <p id="form-success" className="form-success" />
        </motion.form>
      </div>
    </section>
  );
}
