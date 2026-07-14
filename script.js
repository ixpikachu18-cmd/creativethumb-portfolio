const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;

    projects.forEach(project => {
      const show = category === 'all' || project.dataset.category === category;
      project.classList.toggle('hidden', !show);
    });
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxTitle = lightbox.querySelector('p');
const closeLightbox = lightbox.querySelector('.lightbox-close');

function closePreview() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-image').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.dataset.title;
    lightboxTitle.textContent = button.dataset.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

closeLightbox.addEventListener('click', closePreview);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closePreview();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closePreview();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

function openPortfolioPerfectly() {
  const portfolio = document.getElementById("work");

  if (!portfolio) return;

  window.scrollTo({
   top: portfolio.offsetTop - 50,
    left: 0,
    behavior: "auto"
  });
}

window.addEventListener("load", function () {
  if (!window.location.hash || window.location.hash === "#work") {
    requestAnimationFrame(function () {
      openPortfolioPerfectly();

      // Images aur fonts load hone ke baad position dobara correct karega
      setTimeout(openPortfolioPerfectly, 150);
    });
  }
});


// Mobile navigation safety
document.addEventListener("click", (event) => {
  if (
    window.innerWidth <= 700 &&
    nav.classList.contains("open") &&
    !nav.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});
