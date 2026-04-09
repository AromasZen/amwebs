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

  // 5. Service Modals
  const serviceModalsData = [
    {
      title: "Diseño UI/UX",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>`,
      desc: "Creo interfaces intuitivas y visualmente impactantes que enamoran a tus usuarios desde el primer clic.",
      extra: "Enfoque centrado en el usuario. Realizo investigación de mercado, wireframes de alta fidelidad, prototipado interactivo y sistemas de diseño escalables para asegurar una experiencia digital coherente y memorable que aumente la retención y la satisfacción."
    },
    {
      title: "Desarrollo Web Custom",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" /></svg>`,
      desc: "Desarrollo sitios web a medida con código limpio, rendimiento optimizado y arquitectura escalable.",
      extra: "Arquitectura moderna y tecnologías de vanguardia (React, Next.js, Node.js). Integración con APIs de terceros, bases de datos optimizadas, animaciones fluidas y un rendimiento excepcional en Core Web Vitals para superar a la competencia."
    },
    {
      title: "E-Commerce",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>`,
      desc: "Tiendas online que venden mientras duermes. Integro pasarelas de pago, gestión de inventario y experiencias de compra fluidas.",
      extra: "Creación de tiendas virtuales altamente convertidoras. Configuración de pasarelas de pago seguras, carritos de compras optimizados, gestión eficiente de inventarios, automatización de correos transaccionales y estrategias de upselling/cross-selling integradas."
    },
    {
      title: "Optimización SEO",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>`,
      desc: "Hago que Google te encuentre y tus usuarios se queden. Optimizo velocidad, estructura y contenido para que tu web escale posiciones.",
      extra: "Auditoría SEO técnica profunda, optimización On-page y Off-page, investigación de palabras clave estructurada, mejora radical del LCP, FID y CLS, y estructuración de meta-datos avanzados para dominar los primeros resultados de búsqueda hiper-locales y globales."
    }
  ];

  const serviceLinks = document.querySelectorAll('.service-link');
  const modal = document.getElementById('serviceModal');
  const modalOverlay = document.getElementById('serviceModalOverlay');
  const modalClose = document.getElementById('serviceModalClose');
  
  if (modal) {
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalExtra = document.getElementById('modalExtra');

    const openModal = (index) => {
      const data = serviceModalsData[index];
      if (data) {
        modalIcon.innerHTML = data.icon;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalExtra.textContent = data.extra;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
      }
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    serviceLinks.forEach((link, index) => {
      link.addEventListener('click', () => {
        openModal(index);
      });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    const modalCta = document.getElementById('modalCta');
    if (modalCta) {
      modalCta.addEventListener('click', () => {
        closeModal();
      });
    }
  }

  // 6. Hero Background Video (HLS.js)
  const videoElement = document.getElementById('heroVideo');
  if (videoElement) {
    const videoSrc = 'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8';
    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = videoSrc;
    } else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: true
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(videoElement);
    }
  }

  // 7. Infinite Logo Scroll
  const logosSlide = document.querySelector('.logos-slide');
  if (logosSlide) {
    const items = logosSlide.innerHTML;
    // Duplicamos el contenido para el efecto de carrusel infinito (-50% translateX)
    logosSlide.innerHTML += items; 
  }
});
