// Add basic interactivity or leave it empty for now
console.log("Portfolio loaded!");

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
      container.textContent = ""; // clear for next loop
      typeWriter();
    }, 2000); // 2s pause before restarting
  }
}

typeWriter();