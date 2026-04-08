document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close the menu when clicking on any link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-flip');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Revele elements only once
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // 4. Contact Form Submission (WhatsApp Redirect)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const projectType = document.getElementById('projectType').options[document.getElementById('projectType').selectedIndex].text;
      const budget = document.getElementById('budget').value;

      const message = `¡Hola Agustín! Me gustaría contactarte por un proyecto.%0A%0A*Nombre:* ${name}%0A*Email:* ${email}%0A*Tipo de proyecto:* ${projectType}%0A*Presupuesto:* ${budget}`;

      const whatsappNumber = "5492914425849"; // Formatted for wa.me API
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<span>Redirigiendo a WhatsApp...</span>';
      btn.disabled = true;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        contactForm.reset();
        
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 500);
    });
  }
});
