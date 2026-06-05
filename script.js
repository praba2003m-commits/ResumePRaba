/* =============================================
   PRABAKARAN.M — Portfolio JavaScript
   script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.navcol a');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('nav-active'));
        const active = document.querySelector(`.navcol a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('nav-active');
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));


  /* ── 2. SMOOTH SCROLL FOR ALL ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── 3. SKILL BARS ANIMATE ON SCROLL ── */
  const skillFills = document.querySelectorAll('.skill-bar-fill');

  // Store target widths, then reset to 0
  skillFills.forEach(bar => {
    bar.dataset.width = bar.style.width;
    bar.style.width = '0%';
    bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(bar => skillObserver.observe(bar));


  /* ── 4. FADE-UP ON SCROLL FOR CARDS ── */
  const fadeEls = document.querySelectorAll(
    '.city, .city1, .tool-card, .snippet-card, .stat-card, .timeline-item, .about-photo, .about-content'
  );

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 80 * (Array.from(fadeEls).indexOf(entry.target) % 4));
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));


  /* ── 5. TYPING EFFECT — HERO ROLE TEXT ── */
  const roleEl = document.querySelector('.txt-2');
  if (roleEl) {
    const originalText = roleEl.textContent.trim();
    const plainText = 'AWS — DevOps Engineer';
    roleEl.textContent = '';
    let i = 0;

    function type() {
      if (i < plainText.length) {
        roleEl.textContent += plainText[i];
        i++;
        setTimeout(type, 60);
      } else {
        // Restore full HTML with icons after typing
        roleEl.innerHTML = '<i class="bi bi-server"></i> AWS — DevOps Engineer <i class="bi bi-server"></i>';
      }
    }

    // Delay start slightly so hero animates in first
    setTimeout(type, 800);
  }


  /* ── 6. NAVBAR SHRINK ON SCROLL ── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.padding = '0 20px';
      navbar.style.boxShadow = '0 4px 24px rgba(0,255,60,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });


  /* ── 7. CONTACT FORM — MOCK SUBMIT ── */
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
      let allFilled = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          allFilled = false;
          input.style.borderColor = '#ff4444';
          setTimeout(() => { input.style.borderColor = ''; }, 2000);
        }
      });

      if (allFilled) {
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#00ff3c';
        submitBtn.disabled = true;
        inputs.forEach(input => { input.value = ''; });
        setTimeout(() => {
          submitBtn.innerHTML = 'Send Message <i class="bi bi-send-fill"></i>';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }


  /* ── 8. STATS COUNTER ANIMATION ── */
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');

        if (!isNaN(num) && num > 0) {
          let current = 0;
          const step = Math.ceil(num / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 40);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));


  /* ── 9. ACTIVE NAV STYLE INJECTION ── */
  const style = document.createElement('style');
  style.textContent = `.nav-active { background: rgba(0,255,60,0.12) !important; color: #00ff3c !important; }`;
  document.head.appendChild(style);

});
