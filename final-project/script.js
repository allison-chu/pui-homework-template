//Select all the necessary elements
const workContainers = document.querySelectorAll('.work-container');
const projectTitles = document.querySelectorAll('.project-title');
const projectNav = document.querySelector('.project-nav');
const heroSection = document.querySelector('.hero');

//Intersection Observer options
const observerOptions = {
  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
  rootMargin: '-20% 0px -20% 0px'
};

let currentActiveIndex = -1;

//Create Intersection Observer for work containers
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

//Start observing all work containers
workContainers.forEach(container => observer.observe(container));

//Handle navigation visibility on scroll
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

//Add click event listeners to project titles with offset
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

//typed.js
document.addEventListener("DOMContentLoaded", () => {
  new Typed("#typed-text", {
    strings: ["Hello! My name is Allison Chu"], 
    typeSpeed: 100, //in milliseconds
    loop: false, 
    showCursor: true, 
    cursorChar: "|", 
  });
});


  //Had such a tough time with intersecion observer, here's the documentation i used so i can cite my sources
  // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
  // https://www.youtube.com/watch?v=2IbRtjez6ag&ab_channel=WebDevSimplified
  // https://dev.to/elvisans/exploring-the-basis-of-the-intersectionobserver-api-17cb

  //Light and dark theme

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        // Update button text based on current theme
        if (body.classList.contains('light-theme')) {
            themeToggle.textContent = 'Dark Mode'; // Change text to indicate dark mode is available
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.textContent = 'Light Mode'; // Change text to indicate light mode is available
            localStorage.setItem('theme', 'dark');
        }
    });
});