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
document.getElementById('year')?.replaceChildren(String(new Date().getFullYear()));

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
  // Keep the original portfolio at the home position after the intro experience.
  if (window.location.hash === "#work") requestAnimationFrame(openPortfolioPerfectly);
});



/* =========================================================
   INTRO EXPERIENCE CONTROLLER
========================================================= */
(function initIntroExperience() {
  const intro = document.getElementById('introExperience');
  const loader = document.getElementById('introLoader');
  const stage = document.getElementById('categoryStage');
  const transition = document.getElementById('categoryTransition');
  const transitionTitle = document.getElementById('transitionTitle');
  const transitionIcon = document.getElementById('transitionIcon');
  const bar = document.getElementById('introProgressBar');
  const text = document.getElementById('introProgressText');
  const cards = [...document.querySelectorAll('.category-card')];
  const exploreAll = document.getElementById('exploreAll');
  const categoryView = document.getElementById('categoryPortfolio');
  const categoryBack = document.getElementById('categoryBack');
  const categoryViewTitle = document.getElementById('categoryViewTitle');
  const categoryViewKicker = document.getElementById('categoryViewKicker');
  const dummyGrid = document.getElementById('dummyDesignGrid');
  if (!intro || !loader || !stage || !bar || !text) return;

  const categoryData = {
    graphic: { kicker:'BRANDING • SOCIAL MEDIA • CREATIVE', title:'GRAPHIC <span>DESIGN</span>', icon:'✦', items:['Brand Identity','Campaign Poster','Social Creative','Logo Concept','Event Visual','Digital Banner'] },
    product: { kicker:'PRODUCT VISUALS • ADS • E-COMMERCE', title:'PRODUCT <span>VISUALS</span>', icon:'◇', items:['Luxury Product','Organic Packaging','Premium Watch Ad','Skincare Visual','Eco Product','Coffee Packaging'] },
    photo: { kicker:'RETOUCHING • COLOR • ENHANCEMENT', title:'PHOTO <span>ENHANCEMENT</span>', icon:'✦', items:['Night Enhancement','Portrait Retouch','Color Restoration','Cinematic Edit','Clean Retouch','Creative Color Grade'] }
  };

  function renderDummy(category) {
    const data = categoryData[category]; if (!data || !dummyGrid) return;
    categoryViewKicker.textContent = data.kicker;
    categoryViewTitle.innerHTML = data.title;
    dummyGrid.innerHTML = data.items.map((name,i)=>`<article class="dummy-design ${category}-${i+1}"><span class="dummy-tag">${category.toUpperCase()} PROJECT ${String(i+1).padStart(2,'0')}</span><span class="dummy-shape" aria-hidden="true"></span><h3>${name}</h3></article>`).join('');
  }

  function resetTransition(){
    transition?.classList.remove('is-visible');
    transition?.setAttribute('aria-hidden','true');
    intro.classList.remove('is-transitioning');
    cards.forEach(c=>c.classList.remove('is-selected'));
  }

  function showCategoryStage(){
    categoryView?.classList.remove('is-open');
    categoryView?.setAttribute('aria-hidden','true');
    resetTransition();
    intro.classList.remove('is-hidden');
    intro.classList.add('category-theme');
    loader.style.display='none';
    stage.classList.add('is-visible');
    stage.setAttribute('aria-hidden','false');
    document.body.classList.add('intro-active');
  }

  function openMainPortfolio(){
    resetTransition();
    intro.classList.add('is-hidden');
    stage.classList.remove('is-visible');
    document.body.classList.remove('intro-active');
    categoryView?.classList.remove('is-open');
    categoryView?.setAttribute('aria-hidden','true');
    requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));
  }

  function openCategoryPortfolio(category){
    renderDummy(category);
    resetTransition();
    intro.classList.add('is-hidden');
    stage.classList.remove('is-visible');
    document.body.classList.remove('intro-active');
    categoryView?.classList.add('is-open');
    categoryView?.setAttribute('aria-hidden','false');
    categoryView?.scrollTo({top:0,behavior:'auto'});
  }

  function runTransition(category){
    const data = categoryData[category];
    const titleMap = {
      thumbnail:'THUMBNAIL<br>DESIGN',
      graphic:'GRAPHIC<br>DESIGN',
      product:'PRODUCT<br>VISUALS',
      photo:'PHOTO<br>ENHANCEMENT'
    };
    const iconMap = { thumbnail:'▶', graphic:'✦', product:'◇', photo:'✦' };
    if (transitionTitle) transitionTitle.innerHTML = titleMap[category] || 'CREATIVE<br>WORK';
    if (transitionIcon) transitionIcon.textContent = iconMap[category] || data?.icon || '✦';
    transition?.classList.remove('is-visible');
    transition?.setAttribute('data-transition-category', category);
    // Force a reflow so the cinematic animation restarts on every category selection.
    void transition?.offsetWidth;
    stage.classList.remove('is-visible');
    transition?.classList.add('is-visible');
    transition?.setAttribute('aria-hidden','false');
  }

  function selectCategory(card, category){
    if (intro.classList.contains('is-transitioning')) return;
    intro.classList.add('is-transitioning');
    card?.classList.add('is-selected');

    /* Posters & Flyers should open the normal full portfolio page,
       not the inline category view. */
    if (category === 'Posters & Flyers') {
      runTransition('graphic');
      setTimeout(()=>{
        window.location.href = 'graphic-design.html';
      }, 2150);
      return;
    }

    if (category === 'Branding & Product Design') {
      runTransition('graphic');
      setTimeout(()=>{
        window.location.href = 'branding-product.html';
      }, 2150);
      return;
    }

    history.pushState({creativeThumb:'portfolio',category},'', '#portfolio-'+category);
    runTransition(category);
    setTimeout(()=>{
      if(category==='thumbnail') openMainPortfolio(); else openCategoryPortfolio(category);
    }, 2150);
  }

  function selectAll(){
    if (intro.classList.contains('is-transitioning')) return;
    intro.classList.add('is-transitioning');
    history.pushState({creativeThumb:'portfolio',category:'all'},'', '#work');
    stage.classList.remove('is-visible');
    transition?.classList.add('is-visible');
    setTimeout(()=>{
      resetTransition(); intro.classList.add('is-hidden'); document.body.classList.remove('intro-active');
      document.getElementById('work')?.scrollIntoView({behavior:'smooth',block:'start'});
    },1350);
  }

  cards.forEach(card=>card.addEventListener('click',()=>selectCategory(card,card.dataset.category)));
  exploreAll?.addEventListener('click',selectAll);
  categoryBack?.addEventListener('click',()=>history.back());

  window.addEventListener('popstate',()=>showCategoryStage());

  // When returning to the category page with the browser Back button, Chrome
  // may restore the previous DOM from the back/forward cache (bfcache). In
  // that case the transition overlay can remain visible from the click that
  // opened a portfolio page. Always restore the clean category screen when
  // the page is restored from bfcache.
  window.addEventListener('pageshow',(event)=>{
    if(!event.persisted) return;
    loader.style.display='none';
    loader.style.opacity='0';
    loader.style.transform='none';
    showCategoryStage();
    requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));
  });

  // Loader then initial category screen. Mark the category screen as the history base.
  document.body.classList.add('intro-active');
  let progress=0; const duration=2400; const startTime=performance.now();
  function animateLoader(now){
    progress=Math.min(100,Math.round(((now-startTime)/duration)*100));
    bar.style.width=progress+'%'; text.textContent=`LOADING EXPERIENCE… ${progress}%`;
    if(progress<100){requestAnimationFrame(animateLoader);return;}
    setTimeout(()=>{
      loader.style.opacity='0'; loader.style.transform='scale(.96)';
      setTimeout(()=>{
        loader.style.display='none'; intro.classList.add('category-theme'); stage.classList.add('is-visible'); stage.setAttribute('aria-hidden','false');
        if(!history.state || history.state.creativeThumb!=='categories') history.replaceState({creativeThumb:'categories'},'', '#categories');
      },350);
    },180);
  }
  requestAnimationFrame(animateLoader);
})();
