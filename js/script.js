tailwind.config = {
  darkMode: 'class'
};

const html = document.getElementById('html-root');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  html.classList.add('dark');
} else if (savedTheme === 'light') {
  html.classList.remove('dark');
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.classList.add('dark');
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    'hero.badge': 'Portfolio',
    'hero.name': 'Kritanon Museesut',
    'hero.role': 'Computer Science Student @ Kasetsart University',
    'hero.viewProjects': 'View Projects',
    'hero.github': 'GitHub',

    'skills.badge': 'Skills',
    'skills.title': 'Skills & Technologies',
    'skills.programming': 'Programming Languages',
    'skills.tools': 'Tools & Collaboration',
    'skills.frameworks': 'Frameworks & Technologies',

    'projects.badge': 'Projects',
    'projects.title': 'Featured Projects',
    'projects.github': 'GitHub',
    'projects.liveDemo': 'Live Demo',

    'contact.badge': 'Contact',
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Feel free to reach out for collaborations or just a friendly chat',
    'contact.email': 'Email',
    'contact.phone': 'Phone',

    'footer.copyright': '© 2025 Kritanon Museesut. All rights reserved.'
  },

  th: {
    'nav.home': 'หน้าแรก',
    'nav.skills': 'ทักษะ',
    'nav.projects': 'ผลงาน',
    'nav.contact': 'ติดต่อ',

    'hero.badge': 'Portfolio',
    'hero.name': 'Kritanon Museesut',
    'hero.role': 'นิสิตวิทยาการคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์',
    'hero.viewProjects': 'ดูผลงาน',
    'hero.github': 'GitHub',

    'skills.badge': 'ทักษะ',
    'skills.title': 'ทักษะและเทคโนโลยี',
    'skills.programming': 'Programming Languages',
    'skills.tools': 'Tools & Collaboration',
    'skills.frameworks': 'Frameworks & Technologies',

    'projects.badge': 'ผลงาน',
    'projects.title': 'โปรเจกต์เด่น',
    'projects.github': 'GitHub',
    'projects.liveDemo': 'ดูตัวอย่าง',

    'contact.badge': 'ติดต่อ',
    'contact.title': 'ติดต่อฉัน',
    'contact.subtitle': 'สามารถติดต่อเพื่อพูดคุย ร่วมงาน หรือสอบถามเพิ่มเติมได้',
    'contact.email': 'อีเมล',
    'contact.phone': 'เบอร์โทร',

    'footer.copyright': '© 2025 Kritanon Museesut. All rights reserved.'
  }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function updateThemeIcons() {
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  if (!sunIcon || !moonIcon) return;

  const isDark = html.classList.contains('dark');

  if (isDark) {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
  }
}

function updateLanguageButtons(language) {
  const languageButtons = document.querySelectorAll('.language-button');

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;

    button.classList.toggle('bg-slate-950', isActive);
    button.classList.toggle('text-white', isActive);
    button.classList.toggle('dark:bg-white', isActive);
    button.classList.toggle('dark:text-slate-950', isActive);
  });
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem('language', language);

  html.setAttribute('lang', language);

  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach((element) => {
    const key = element.dataset.i18n;
    const text = translations[language]?.[key];

    if (text) {
      element.textContent = text;
    }
  });

  updateLanguageButtons(language);
  updateProjectButtonLabels();
}

function scrollToBlock(id) {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function updateProjectButtonLabels() {
  const githubLinks = document.querySelectorAll('[data-project-link="github"]');
  const liveDemoLinks = document.querySelectorAll('[data-project-link="liveDemo"]');

  githubLinks.forEach((link) => {
    link.textContent = translations[currentLanguage]['projects.github'];
  });

  liveDemoLinks.forEach((link) => {
    link.textContent = translations[currentLanguage]['projects.liveDemo'];
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcons();
  setLanguage(currentLanguage);

  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');

      const isDark = html.classList.contains('dark');

      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      updateThemeIcons();
    });
  }

  const languageButtons = document.querySelectorAll('.language-button');

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.dataset.language;

      setLanguage(language);
    });
  });

  const viewProjectsButton = document.getElementById('view-projects-button');

  if (viewProjectsButton) {
    viewProjectsButton.addEventListener('click', () => {
      scrollToBlock('projects');
    });
  }

  const githubButton = document.getElementById('github-button');

  if (githubButton) {
    githubButton.addEventListener('click', () => {
      window.open('https://github.com/krittanonmss', '_blank', 'noopener,noreferrer');
    });
  }

  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      scrollToBlock(targetId);
    });
  });

  const skillItems = document.querySelectorAll('.skill-item');

  skillItems.forEach((item) => {
    item.className = 'skill-item flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-medium text-slate-700 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:bg-white/10';

    const image = item.querySelector('img');

    if (image) {
      image.classList.add('h-9', 'w-9', 'object-contain');
    }
  });

  const socialIcons = document.querySelectorAll('.social-icon');

  socialIcons.forEach((item) => {
    item.className = 'social-icon inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15';

    const image = item.querySelector('img');

    if (image) {
      image.classList.add('h-5', 'w-5', 'dark:invert');
    }
  });

  fetch('projects.json')
    .then((res) => res.json())
    .then((projects) => {
      const container = document.getElementById('projects-container');

      projects.forEach((project) => {
        const card = document.createElement('article');
        card.className = 'min-w-[280px] max-w-[320px] flex-none rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]';

        const title = document.createElement('h3');
        title.className = 'text-lg font-bold text-slate-950 dark:text-white';
        title.textContent = project.title;

        const description = document.createElement('p');
        description.className = 'mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400';
        description.textContent = project.description;

        const tech = document.createElement('p');
        tech.className = 'mt-4 text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-300';
        tech.textContent = Array.isArray(project.techStack) ? project.techStack.join(', ') : '';

        const links = document.createElement('div');
        links.className = 'mt-5 flex flex-wrap gap-2';

        if (project.github) {
          const githubLink = document.createElement('a');
          githubLink.href = project.github;
          githubLink.target = '_blank';
          githubLink.rel = 'noopener noreferrer';
          githubLink.dataset.projectLink = 'github';
          githubLink.className = 'rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200';
          githubLink.textContent = translations[currentLanguage]['projects.github'];

          links.appendChild(githubLink);
        }

        if (project.liveDemo) {
          const demoLink = document.createElement('a');
          demoLink.href = project.liveDemo;
          demoLink.target = '_blank';
          demoLink.rel = 'noopener noreferrer';
          demoLink.dataset.projectLink = 'liveDemo';
          demoLink.className = 'rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10';
          demoLink.textContent = translations[currentLanguage]['projects.liveDemo'];

          links.appendChild(demoLink);
        }

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(tech);
        card.appendChild(links);

        container.appendChild(card);
      });
    })
    .catch((err) => console.error(err));

  const carousel = document.getElementById('projects-container');

  if (!carousel) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;

    carousel.scrollLeft = scrollLeft - walk;
  });

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;

    carousel.scrollLeft = scrollLeft - walk;
  });

  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  const cardWidth = 336;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    });
  }
});