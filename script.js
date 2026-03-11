/* ============================================
   RAM PORTFOLIO - ENHANCED SCRIPT.JS
   Advanced Animations, Custom Cursor, 3D Tilt,
   Preloader, Magnetic Buttons, Parallax & More
   ============================================ */

// GLOBAL FAILSAFE: If ANY error occurs, always hide preloader & show content
window.addEventListener('error', function() {
  var preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('hidden');
  document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
});

document.addEventListener('DOMContentLoaded', () => {
try {

  // ========== PRELOADER ==========
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  let loadProgress = 0;

  const preloadInterval = setInterval(() => {
    loadProgress += Math.random() * 15 + 5;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(preloadInterval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger initial animations after preloader hides
        triggerEntryAnimations();
      }, 400);
    }
    preloaderProgress.style.width = `${loadProgress}%`;
  }, 200);

  function triggerEntryAnimations() {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }

  // ========== SCROLL PROGRESS BAR ==========
  const scrollProgressBar = document.createElement('div');
  scrollProgressBar.className = 'scroll-progress';
  document.body.appendChild(scrollProgressBar);

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${scrollPercent}%`;
  }
  window.addEventListener('scroll', updateScrollProgress);

  // ========== CUSTOM CURSOR ==========
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  let cursorX = 0, cursorY = 0, outlineX = 0, outlineY = 0;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.left = `${cursorX - 4}px`;
      cursorDot.style.top = `${cursorY - 4}px`;
    });

    // Smooth outline follow
    function animateCursorOutline() {
      outlineX += (cursorX - outlineX) * 0.12;
      outlineY += (cursorY - outlineY) * 0.12;
      cursorOutline.style.left = `${outlineX - 18}px`;
      cursorOutline.style.top = `${outlineY - 18}px`;
      requestAnimationFrame(animateCursorOutline);
    }
    animateCursorOutline();

    // Hover state for interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .tech-card, .concept-card, .achievement-card, .overlay-btn, input, textarea');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovering');
        cursorOutline.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovering');
        cursorOutline.classList.remove('hovering');
      });
    });

    // Click animation
    document.addEventListener('mousedown', () => cursorOutline.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursorOutline.classList.remove('clicking'));
  }

  // ========== PARTICLE CANVAS BACKGROUND ==========
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '79, 143, 255' : '139, 92, 246';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      if (mouse.x !== null) {
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
          // Boost opacity near mouse for interactive feel
          this.opacity = Math.min(0.8, this.opacity + 0.01);
        } else {
          this.opacity = Math.max(0.1, this.opacity - 0.005);
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 150);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  initParticles();
  window.addEventListener('resize', initParticles);

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79, 143, 255, ${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Draw lines from mouse to nearby particles
  function connectToMouse() {
    if (mouse.x === null) return;
    particles.forEach(p => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 180)})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    connectToMouse();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ========== TYPEWRITER EFFECT ==========
  const phrases = [
    'AI & Data Science Student',
    'Python Developer',
    'Future AI Engineer',
    'Problem Solver',
    'Tech Enthusiast'
  ];
  const typewriterEl = document.getElementById('typewriter');
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function typewrite() {
    const current = phrases[phraseIdx];
    typewriterEl.textContent = isDeleting
      ? current.substring(0, charIdx--)
      : current.substring(0, charIdx++);

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx > current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx < 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 500;
    }
    setTimeout(typewrite, speed);
  }
  typewrite();

  // ========== NAVBAR ==========
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // ========== SCROLL REVEAL WITH STAGGER ==========
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get all siblings within same parent to stagger
        const parent = entry.target.parentElement;
        const siblings = parent.querySelectorAll('.reveal:not(.visible)');
        siblings.forEach((sib, idx) => {
          if (sib === entry.target || (sib.getBoundingClientRect().top < window.innerHeight)) {
            setTimeout(() => sib.classList.add('visible'), idx * 120);
          }
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ========== SKILL BAR ANIMATION ==========
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  skillFills.forEach(fill => skillObserver.observe(fill));

  // ========== STAT COUNTER WITH EASING ==========
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'));
        animateCounter(target, 0, count, 1200);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(num => counterObserver.observe(num));

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ========== 3D TILT EFFECT ==========
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // ========== MAGNETIC BUTTON EFFECT ==========
  const magneticButtons = document.querySelectorAll('.magnetic');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ========== RIPPLE EFFECT ON BUTTONS ==========
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ========== PARALLAX ON SCROLL ==========
  const parallaxElements = document.querySelectorAll('.hero-content');

  function handleParallax() {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      // Only apply parallax after reveal animation is done
      if (!el.classList.contains('visible') && el.classList.contains('reveal')) return;
      const speed = el.classList.contains('hero-content') ? 0.3 : 0.15;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }
  window.addEventListener('scroll', handleParallax);

  // ========== FLOATING RIBBON ==========
  const floatingRibbon = document.getElementById('floatingRibbon');
  let ribbonShown = false;

  function handleRibbonVisibility() {
    if (window.scrollY > 600 && !ribbonShown) {
      ribbonShown = true;
      floatingRibbon.classList.add('visible');
      // Auto-hide after 5 seconds
      setTimeout(() => {
        if (!floatingRibbon.matches(':hover')) {
          floatingRibbon.classList.remove('visible');
        }
      }, 5000);
    }
  }
  window.addEventListener('scroll', handleRibbonVisibility);

  // Show ribbon again when scrolling near projects section
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    const ribbonObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          floatingRibbon.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    ribbonObserver.observe(projectsSection);
  }

  // ========== TEXT SCRAMBLE EFFECT ON SECTION TITLES ==========
  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

  function scrambleText(el) {
    const originalText = el.textContent;
    const length = originalText.length;
    let iteration = 0;

    const interval = setInterval(() => {
      el.textContent = originalText
        .split('')
        .map((char, idx) => {
          if (idx < iteration) return originalText[idx];
          if (char === ' ') return ' ';
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      if (iteration >= length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  }

  // Apply scramble to section titles on reveal
  const sectionTitles = document.querySelectorAll('.section-title');
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get only the text content (not the number span)
        const textNode = entry.target.childNodes;
        textNode.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            const tempSpan = document.createElement('span');
            tempSpan.textContent = node.textContent;
            node.replaceWith(tempSpan);
            scrambleText(tempSpan);
          }
        });
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  sectionTitles.forEach(title => titleObserver.observe(title));

  // ========== GLITCH EFFECT ON NAME HOVER ==========
  const gradientText = document.querySelector('.gradient-text');
  if (gradientText) {
    gradientText.addEventListener('mouseenter', () => {
      gradientText.classList.add('glitch-text');
    });
    gradientText.addEventListener('mouseleave', () => {
      setTimeout(() => gradientText.classList.remove('glitch-text'), 1000);
    });
  }

  // ========== TECH CARD HOVER RIPPLE ==========
  document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.animation = 'none';
      this.offsetHeight; // Trigger reflow
      this.style.animation = '';
    });
  });

  // ========== BACK TO TOP ==========
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;

    // Success animation
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #06d6a0, #4f8fff)';
    btn.style.transform = 'scale(1.05)';

    // Confetti-like particles on success
    createSuccessParticles(btn);

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.transform = '';
      contactForm.reset();
    }, 3000);
  });

  function createSuccessParticles(btn) {
    const rect = btn.getBoundingClientRect();
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 6px; height: 6px;
        background: ${['#4f8fff', '#8b5cf6', '#06d6a0', '#fff'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;
      document.body.appendChild(particle);
      requestAnimationFrame(() => {
        particle.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 200}px`;
        particle.style.top = `${rect.top - Math.random() * 150}px`;
        particle.style.opacity = '0';
        particle.style.transform = `scale(0)`;
      });
      setTimeout(() => particle.remove(), 1000);
    }
  }

  // ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // Don't prevent default for standalone # links
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========== EASTER EGG: KONAMI CODE ==========
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIdx = 0;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konamiCode.length) {
        konamiIdx = 0;
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => { document.body.style.filter = ''; }, 3000);
      }
    } else {
      konamiIdx = 0;
    }
  });

  // ========== CONSOLE GREETING ==========
  console.log(
    '%c⚡ PR Portfolio %c Built with passion & JavaScript ',
    'background: linear-gradient(135deg, #4f8fff, #8b5cf6); color: white; font-size: 16px; padding: 8px 16px; border-radius: 8px 0 0 8px; font-weight: bold;',
    'background: #0a0a1a; color: #8b5cf6; font-size: 14px; padding: 8px 16px; border-radius: 0 8px 8px 0;'
  );

} catch (err) {
  // FAILSAFE: If any error occurs inside the try block, ensure content is visible
  console.error('Portfolio script error:', err);
  var preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('hidden');
  document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
}
});
