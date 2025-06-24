// js/scripts.js

// Optional: Close dropdowns on outside click (for better UX)

document.addEventListener('click', function(event) {
  const dropdowns = document.querySelectorAll('nav ul li ul.dropdown');
  dropdowns.forEach(dropdown => {
    if (!dropdown.parentElement.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });
});

// You can expand this file later for more interactivity
