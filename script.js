
// ===============================
// Portfolio Loaded
// ===============================
console.log("Portfolio loaded!");

// ===============================
// Typewriter Effect for Name
// ===============================
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
      container.textContent = "";
      typeWriter();
    }, 2000);
  }
}

if (container) {
  typeWriter();
}

// ===============================
// Mobile Menu Toggle
// ===============================
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.toggle("show");
  }
}

// ===============================
// Neuron Background Canvas
// ===============================
const canvas = document.getElementById("neuronCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    setupTree();
  });

  // --------- Neuron Class ----------
  class Neuron {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 3;
      this.color = "#58a6ff";
      this.dx = (Math.random() - 0.5) * 0.3;
      this.dy = (Math.random() - 0.5) * 0.3;
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    connect(other) {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = "#1f6feb33";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  const neurons = [];
  for (let i = 0; i < 80; i++) {
    neurons.push(new Neuron(
      Math.random() * canvas.width,
      Math.random() * canvas.height / 1.2
    ));
  }

  // --------- Tree (Branch Class) ----------
  class Branch {
    constructor(x, y, angle, depth) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.depth = depth;
      this.length = 30 * Math.pow(0.9, depth);
      this.childBranches = [];
      this.generated = false;
    }

    generateBranches() {
      if (this.depth >= 7) return;

      const spread = Math.PI / 4;
      const angle1 = this.angle - spread + Math.random() * 0.2;
      const angle2 = this.angle + spread - Math.random() * 0.2;

      const x1 = this.x + this.length * Math.cos(angle1);
      const y1 = this.y - this.length * Math.sin(angle1);
      const x2 = this.x + this.length * Math.cos(angle2);
      const y2 = this.y - this.length * Math.sin(angle2);

      this.childBranches.push(new Branch(x1, y1, angle1, this.depth + 1));
      this.childBranches.push(new Branch(x2, y2, angle2, this.depth + 1));

      this.generated = true;
    }

    draw(ctx) {
      const endX = this.x + this.length * Math.cos(this.angle);
      const endY = this.y - this.length * Math.sin(this.angle);

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `rgba(173, 216, 230, ${1 - this.depth / 8})`;
      ctx.lineWidth = Math.max(1, 3 - this.depth * 0.3);
      ctx.stroke();

      if (!this.generated) {
        this.generateBranches();
      }

      this.childBranches.forEach(branch => branch.draw(ctx));
    }
  }
  

  let rootBranch;
  function setupTree() {
    const x = canvas.width - 80;
    const y = canvas.height - 20;
    rootBranch = new Branch(x, y, -Math.PI / 2, 0);
  }

  setupTree();

  // --------- Animate Everything ----------
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Neurons
    for (let i = 0; i < neurons.length; i++) {
      const n1 = neurons[i];
      n1.update();
      n1.draw(ctx);
      for (let j = i + 1; j < neurons.length; j++) {
        n1.connect(neurons[j]);
      }
    }

    // Tree
    rootBranch.draw(ctx);

    requestAnimationFrame(animate);
  }

  animate();
}

//------------------------------------------------------------------------//
