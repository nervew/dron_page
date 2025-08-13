/* assets/script.js */
// Interacciones: menú móvil, acordeón, lightbox, filtros, back-top, lite video, validaciones y modales

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  const backTop = document.getElementById('back-to-top');

  // Menú móvil
  menuBtn?.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('hidden');
  });

  // Back to top
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backTop.classList.remove('hidden');
    else backTop.classList.add('hidden');
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // FAQ acordeón
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      panel.classList.toggle('hidden');
    });
  });

  // Lightbox simple
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  document.querySelectorAll('a.lightbox').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      lightboxImg.src = link.href;
      lightbox.classList.remove('hidden');
      document.body.classList.add('lightbox-open');
      lightboxClose.focus();
    });
  });
  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
    document.body.classList.remove('lightbox-open');
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keyup', e => { if (e.key === 'Escape') closeLightbox(); });

  // Filtros de portafolio
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('#portfolio-grid .portfolio-item');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });

  // Lite embed para videos
  document.querySelectorAll('.lite-video').forEach(div => {
    div.addEventListener('click', () => {
      const id = div.dataset.id;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      iframe.title = 'Reproductor de video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.className = 'w-full h-full';
      div.replaceWith(iframe);
    }, { once: true });
  });

  // Formulario
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', e => {
    let valid = true;
    const nombre = form.nombre;
    if (!nombre.value.trim()) {
      valid = false;
      document.getElementById('error-nombre').classList.remove('hidden');
    } else {
      document.getElementById('error-nombre').classList.add('hidden');
    }
    const email = form.email;
    if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      valid = false;
      document.getElementById('error-email').classList.remove('hidden');
    } else {
      document.getElementById('error-email').classList.add('hidden');
    }
    const telefono = form.telefono;
    if (!telefono.value.trim()) {
      valid = false;
      document.getElementById('error-telefono').classList.remove('hidden');
    } else {
      document.getElementById('error-telefono').classList.add('hidden');
    }
    if (!valid) {
      e.preventDefault();
      document.getElementById('form-status').textContent = 'Revisa los campos resaltados.';
    }
  });

  // Modales
  document.querySelectorAll('a[href^="#privacidad"],a[href^="#terminos"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(link.getAttribute('href').substring(1)).classList.remove('hidden');
    });
  });
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.modal').classList.add('hidden'));
  });

  // Cookie banner
  const cookie = document.getElementById('cookie-banner');
  const aceptar = document.getElementById('cookie-aceptar');
  aceptar.addEventListener('click', () => cookie.classList.add('hidden'));

  // Año en footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
