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

  // 8. Cursor Interactivo "Bicho"
  const bichoContainer = document.createElement('div');
  bichoContainer.id = 'bicho-cursor-container';
  document.body.appendChild(bichoContainer);

  const N = 20;
  let width = window.innerWidth;
  let height = window.innerHeight;
  const pointer = { x: width / 2, y: height / 2 };
  
  // Custom cursor elements
  const elems = [];
  for (let i = 0; i < N; i++) {
    elems[i] = { use: null, x: width / 2, y: height / 2 };
  }

  // Helper to create and style segments
  function prepend(type, index) {
      const el = document.createElement('div');
      el.className = `bicho-segment ${type.toLowerCase()}`;
      bichoContainer.appendChild(el);
      elems[index].use = el;
      
      // Default styles
      el.style.position = "fixed";
      el.style.top = "0";
      el.style.left = "0";
      el.style.pointerEvents = "none";
      el.style.zIndex = "9999";
      
      if (type === "Cabeza") {
          el.style.width = "18px";
          el.style.height = "18px";
          el.style.backgroundColor = "#00E5FF";
          el.style.borderRadius = "50%";
          el.style.boxShadow = "0 0 15px #00E5FF, 0 0 30px #00E5FF";
      } else if (type === "Aletas") {
          el.style.width = "30px";
          el.style.height = "4px";
          el.style.backgroundColor = "#7C3AED";
          el.style.borderRadius = "2px";
          el.style.boxShadow = "0 0 10px #7C3AED";
      } else {
          const size = Math.max(3, 14 - index * 0.6);
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.backgroundColor = `rgba(0, 229, 255, ${Math.max(0.2, 1 - index / N)})`;
          el.style.borderRadius = "50%";
      }
  }

  // Initialize nodes based on the snippet pattern
  for (let i = 1; i < N; i++) {
      if (i === 1) prepend("Cabeza", i);
      else if (i === 8 || i === 14) prepend("Aletas", i);
      else prepend("Espina", i);
  }

  // Listeners
  window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY;
  });

  // Animation Loop
  function anim() {
      requestAnimationFrame(anim);
      
      // Smooth follow for the virtual leader node
      let leader = elems[0];
      leader.x += (pointer.x - leader.x) * 0.15;
      leader.y += (pointer.y - leader.y) * 0.15;

      // Iterative Inverse Kinematics for the rest
      for (let i = 1; i < N; i++) {
          let current = elems[i];
          let prev = elems[i - 1];
          
          let dx = prev.x - current.x;
          let dy = prev.y - current.y;
          let angle = Math.atan2(dy, dx);
          
          let targetDist = i === 1 ? 0 : 7; // distance between segments

          current.x = prev.x - Math.cos(angle) * targetDist;
          current.y = prev.y - Math.sin(angle) * targetDist;

          if (current.use) {
              current.use.style.transform = `translate(calc(${current.x}px - 50%), calc(${current.y}px - 50%)) rotate(${angle}rad)`;
          }
      }
  }
  
  anim(); // Start the loop

  // 9. Scroll Progress Bar
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    });
  }

  // 10. Parallax Effect
  const parallaxElements = document.querySelectorAll('.parallax');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      let scrollY = window.scrollY;
      parallaxElements.forEach(el => {
        let speed = el.getAttribute('data-speed') || 0.1;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // 11. Spotlight Hover on Glass Cards
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 12. Magnetic Buttons
  const magneticButtons = document.querySelectorAll('.btn');
  magneticButtons.forEach(btn => {
    btn.classList.add('btn-magnetic');
    
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Fuerza del magnetismo
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // 13. 3D Car Scroll Effect
  const canvas = document.getElementById('carCanvas');
  if (canvas) {
    const context = canvas.getContext('2d');
    const frameCount = 192;
    const currentFrame = index => (
      `imagenes/${(index + 1).toString().padStart(5, '0')}.png`
    );

    const images = [];
    const car = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const render = () => {
      if(images[car.frame] && images[car.frame].complete && images[car.frame].naturalWidth !== 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const img = images[car.frame];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;  
        
        context.drawImage(img, 0, 0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    images[0].onload = render;
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      
      requestAnimationFrame(() => {
        if (car.frame !== frameIndex) {
          car.frame = frameIndex;
          render();
        }
      });
    }, { passive: true });
  }
});
