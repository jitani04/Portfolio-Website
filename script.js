document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    // guard: ensure target exists
    const target = document.querySelector(href);
    if (!target) return; // let the browser handle it if no matching element
    e.preventDefault();
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});

// Add animations to other elements
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  });

  elements.forEach(element => {
    observer.observe(element);
  });

  // Observe the content section
  const contentSection = document.querySelector('.content');
  const contentObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  contentObserver.observe(contentSection);
});

function toggleDescription(button) {
  const item = button.parentElement;
  item.classList.toggle('active');
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // basic client-side validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      statusEl.textContent = 'Please fill out all fields.';
      return;
    }

    // Disable while sending
    submitButton.disabled = true;
    statusEl.textContent = 'Sending...';

    const endpoint = form.getAttribute('data-endpoint');

    // If no endpoint is configured, open mailto as a fallback
    if (!endpoint) {
      const mailto = `mailto:jmitani4@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\n\n--\n' + name + ' (' + email + ')')}`;
      window.location.href = mailto;
      submitButton.disabled = false;
      statusEl.textContent = 'Opening mail client...';
      return;
    }

    // POST JSON to configured endpoint (e.g., Formspree / serverless function)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        statusEl.textContent = 'Thanks! Your message has been sent.';
        form.reset();
      } else {
        const text = await res.text();
        statusEl.textContent = 'Error sending message.' + (text ? ' ' + text : '');
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please try again later.';
      console.error(err);
    } finally {
      submitButton.disabled = false;
    }
  });
});