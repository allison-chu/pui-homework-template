// Select all the necessary elements
const workContainers = document.querySelectorAll('.work-container');
const projectTitles = document.querySelectorAll('.project-title');
const projectNav = document.querySelector('.project-nav');
const heroSection = document.querySelector('.hero');

// Updated Intersection Observer options
const observerOptions = {
  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
  rootMargin: '-20% 0px -20% 0px'
};

let currentActiveIndex = -1;

// Create Intersection Observer for work containers
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const index = Array.from(workContainers).indexOf(entry.target);
    
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      if (index !== currentActiveIndex) {
        projectTitles.forEach(title => title.classList.remove('active'));
        projectTitles[index].classList.add('active');
        currentActiveIndex = index;
      }
    }
  });
}, observerOptions);

// Start observing all work containers
workContainers.forEach(container => observer.observe(container));

// Handle navigation visibility on scroll
window.addEventListener('scroll', () => {
  const myWorkSection = document.getElementById('my-work');
  const myWorkTop = myWorkSection.getBoundingClientRect().top;
  const navThreshold = window.innerHeight * 0.2; // 20% of viewport height

  if (myWorkTop <= navThreshold) {
    projectNav.classList.add('visible');
  } else {
    projectNav.classList.remove('visible');
  }
});

// Add click event listeners to project titles with offset
projectTitles.forEach((title, index) => {
  title.addEventListener('click', () => {
    const offset = window.innerHeight * 0.3; // 30% of viewport height
    const elementPosition = workContainers[index].getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const text = "Hello! My name is Allison Chu";
    const typedTextSpan = document.getElementById("typed-text");
    const cursorSpan = document.querySelector(".cursor");
  
    let i = 0;
    const typingDelay = 100;
  
    function type() {
      if (i < text.length) {
        typedTextSpan.textContent += text.charAt(i);
        i++;
        setTimeout(type, typingDelay);
      } else {
        cursorSpan.style.display = 'none';
      }
    }
  
    if (typedTextSpan) {
      setTimeout(type, typingDelay + 1000);
    }
  });