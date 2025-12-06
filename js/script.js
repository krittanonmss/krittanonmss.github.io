// =====================
// 1. โหลด Projects จาก JSON
// =====================
fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.innerHTML = `
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <p class="project-tech">${project.techStack.join(', ')}</p>
        <div class="project-links">
          <a href="${project.github}" target="_blank">GitHub</a>
          ${project.liveDemo ? `<a href="${project.liveDemo}" target="_blank">Live Demo</a>` : ''}
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error(err));


// =====================
// 2. Nav links scroll แบบ smooth
// =====================
function scrollToBlock(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    scrollToBlock(targetId);
  });
});


// =====================
// 3. Projects Carousel Drag / Swipe
// =====================
const carousel = document.getElementById('projects-container');

let isDown = false;
let startX;
let scrollLeft;

// Mouse events
carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.classList.add('active');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => isDown = false);
carousel.addEventListener('mouseup', () => isDown = false);

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // ความเร็วลาก
  carousel.scrollLeft = scrollLeft - walk;
});

// Touch events (มือถือ)
carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});


// =====================
// 4. Carousel ปุ่มเลื่อน < >
// =====================
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

const cardWidth = 320 + 16; // ความกว้าง card + gap (ปรับตาม CSS ของ card จริง)

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
});
