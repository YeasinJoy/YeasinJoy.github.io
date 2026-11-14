/**
 * Yeasin Morshed Joy - Portfolio Scripts
 * Handles Light/Dark theme switching with localStorage, mobile navigation, and project filtering.
 */

// Theme Management
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // default to dark
  document.documentElement.setAttribute('data-theme', initialTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElem = document.documentElement;

  function updateIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggle.setAttribute('title', 'Switch to dark theme');
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggle.setAttribute('title', 'Switch to light theme');
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  // Set initial icon
  const currentTheme = htmlElem.getAttribute('data-theme') || 'dark';
  updateIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = htmlElem.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      htmlElem.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme);
    });
  }

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });
  }
});

// Project Filtering for projects.html
function filterProjects(category, btn) {
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}
