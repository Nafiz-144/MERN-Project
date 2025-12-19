// Empty JavaScript file

// ===== Project Carousel Functions =====
let currentSlide = 0;
const slides = document.querySelectorAll(".project-slide");
const indicators = document.querySelectorAll(".indicator");

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  if (n >= slides.length) {
    currentSlide = 0;
  }
  if (n < 0) {
    currentSlide = slides.length - 1;
  }

  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");
}

function nextProject() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevProject() {
  currentSlide--;
  showSlide(currentSlide);
}

function currentProject(n) {
  currentSlide = n;
  showSlide(currentSlide);
}

// Initialize carousel
document.addEventListener("DOMContentLoaded", function () {
  showSlide(currentSlide);
});

// ===== Image Modal Functions =====
function openModal(imgSrc) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modalImg.src = imgSrc;
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Allow scrolling again
}

// Close modal when clicking outside the image
window.addEventListener("click", function (event) {
  const modal = document.getElementById("imageModal");
  if (event.target == modal) {
    closeModal();
  }
});

// Close modal with Escape key
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  hamburger.classList.toggle("active");
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.style.display = "none";
    hamburger.classList.remove("active");
  });
});

// Active nav link based on scroll position
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const formData = new FormData(this);
  const name = this.children[0].children[0].value;
  const email = this.children[1].children[0].value;
  const message = this.children[2].children[0].value;

  // Basic validation
  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Show success message
  alert("Thank you for your message! I will get back to you soon.");

  // Reset form
  this.reset();

  // Optional: Send to server (uncomment and configure as needed)
  // fetch('/send-email', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ name, email, message })
  // })
  // .then(response => response.json())
  // .then(data => {
  //   alert('Message sent successfully!');
  //   this.reset();
  // })
  // .catch(error => {
  //   alert('Error sending message. Please try again later.');
  //   console.error('Error:', error);
  // });
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all project cards and skill cards
document.querySelectorAll(".project-card, .skill-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Counter animation for stats
function animateCounters() {
  const stats = document.querySelectorAll(".stat h3");
  stats.forEach((stat) => {
    const target = parseInt(stat.innerText);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 50);
    let current = 0;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.innerText = target + "+";
        clearInterval(counter);
      } else {
        stat.innerText = Math.floor(current) + "+";
      }
    }, 50);
  });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
});

const aboutSection = document.querySelector(".about");
if (aboutSection) {
  statsObserver.observe(aboutSection);
}

// Log page load
console.log("Portfolio loaded successfully!");
