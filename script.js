document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
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