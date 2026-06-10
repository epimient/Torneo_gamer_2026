// Torneo Gamer Americana 2026 — Motion HUD System
'use strict';

// --- Navbar Trigger (Mobile) ---
const menuTrigger = document.getElementById('menuTrigger');
const navLinks = document.getElementById('navLinks');

if (menuTrigger && navLinks) {
  menuTrigger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuTrigger.classList.toggle('active');
  });

  document.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuTrigger.classList.remove('active');
    });
  });
}

// --- Sticky Navbar Background ---
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 80) {
    navbar.style.background = 'rgba(11, 19, 38, 0.95)';
  } else {
    navbar.style.background = 'rgba(11, 19, 38, 0.8)';
  }
  lastScroll = currentScroll;
}, { passive: true });

// --- Intersection Observer: Schedule Timeline Reveal ---
const scheduleItems = document.querySelectorAll('.schedule__item');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

scheduleItems.forEach(item => observer.observe(item));

// --- Intersection Observer: HUD Entry for Cards ---
const hudElements = document.querySelectorAll(
  '.about__card, .game-card, .format__card, .prize-card, .register__card'
);

const hudObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('hud-entry');
      hudObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

hudElements.forEach(el => hudObserver.observe(el));

// --- Hero Deep Grid Flow (parallax on scroll) ---
const gridBg = document.querySelector('.hero__grid-bg');
if (gridBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom > 0) {
      const progress = Math.min(scrollY / window.innerHeight, 1);
      gridBg.style.transform = `rotateX(2deg) translateY(${progress * 30}px)`;
    }
  }, { passive: true });
}

// --- Dynamic year in footer ---
const yearEl = document.querySelector('.footer__copy');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace('2026', new Date().getFullYear().toString());
}

console.log('%c TORNEO GAMER AMERICANA 2026 ',
  'background: #be1e2d; color: #ffd3d1; font-weight: bold; padding: 8px 16px; font-size: 16px; font-family: monospace;');
console.log('%c PRO STUDIATON — Cyber-Industrial Solidary ',
  'background: #171f33; color: #eec200; padding: 6px 12px; font-size: 12px; font-family: monospace;');

// --- Random Glitch Bursts ---
const glitchEl = document.querySelector('.glitch');
if (glitchEl) {
  function triggerGlitchBurst() {
    glitchEl.classList.add('glitch--burst');
    setTimeout(() => {
      glitchEl.classList.remove('glitch--burst');
    }, 500);

    // 30% chance of a second burst right after
    if (Math.random() < 0.3) {
      setTimeout(() => {
        glitchEl.classList.add('glitch--burst');
        setTimeout(() => {
          glitchEl.classList.remove('glitch--burst');
        }, 350);
      }, 600);
    }
  }

  function scheduleGlitch() {
    const nextDelay = 3000 + Math.random() * 5000;
    setTimeout(() => {
      triggerGlitchBurst();
      scheduleGlitch();
    }, nextDelay);
  }

  scheduleGlitch();

  // Also trigger on first load after 2s
  setTimeout(triggerGlitchBurst, 2000);
}
