'use strict';

// Menú responsive.
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('menu-navegacion');
function closeMenu() {
  toggle.classList.remove('is-open');
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menú');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.classList.toggle('is-open', open);
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
});

// Galería con navegación mediante flechas y Escape.
const buttons = [...document.querySelectorAll('.gallery-tile')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeButton = document.getElementById('lightbox-close');
let activeIndex = 0;
let lastFocused = null;

function displayImage(index) {
  activeIndex = (index + buttons.length) % buttons.length;
  const button = buttons[activeIndex];
  lightboxImage.src = button.dataset.image;
  lightboxImage.alt = button.querySelector('img').alt;
  lightboxCaption.textContent = button.dataset.caption;
}
function openLightbox(index) {
  lastFocused = document.activeElement;
  displayImage(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeButton.focus();
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImage.removeAttribute('src');
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
}
buttons.forEach((button, index) => button.addEventListener('click', () => openLightbox(index)));
closeButton.addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => displayImage(activeIndex - 1));
document.getElementById('lightbox-next').addEventListener('click', () => displayImage(activeIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (lightbox.classList.contains('is-open')) {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') displayImage(activeIndex - 1);
    if (event.key === 'ArrowRight') displayImage(activeIndex + 1);
  } else if (event.key === 'Escape') closeMenu();
});

// Pie de página.
document.getElementById('year').textContent = new Date().getFullYear();
