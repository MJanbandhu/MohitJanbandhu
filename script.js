// Portfolio Loaded Console Log
console.log("Portfolio loaded!");

// Typewriter Effect for Name
const text = "Mohit Janbandhu";
const container = document.getElementById("typewriterName");
let index = 0;

function typeWriter() {
  if (index <= text.length) {
    container.textContent = text.slice(0, index);
    index++;
    setTimeout(typeWriter, 150);
  } else {
    setTimeout(() => {
      index = 0;
      container.textContent = ""; // Clear for next loop
      typeWriter();
    }, 2000); // 2s pause before restarting
  }
}

// Only run typewriter if the element exists
if (container) {
  typeWriter();
}

// Toggle mobile hamburger menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.toggle("show"); // not 'active', should match CSS
  }
}