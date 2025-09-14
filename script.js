const loadingScreen = document.getElementById("loadingScreen");
const header = document.getElementById("header");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");
const desktopThemeToggle = document.getElementById("desktopThemeToggle");

const requestAnimationFrame = window.requestAnimationFrame || 
                             window.mozRequestAnimationFrame || 
                             window.webkitRequestAnimationFrame || 
                             window.msRequestAnimationFrame;


window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    initAnimations();
  }, 1500);
});
let scrollTimeout;
window.addEventListener("scroll", () => {
  
clearTimeout(scrollTimeout);
  
  requestAnimationFrame(() => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

 
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });
  
 
  scrollTimeout = setTimeout(updateActiveNavLink, 100);
});


mobileMenuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");
  document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
});


navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
    document.body.style.overflow = '';
  });
});
//Nachtzinho 

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
//Nachtzinho 
    
    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    link.classList.add("active");
  });
});

//Nachtzinho 
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + header.offsetHeight + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

//Nachtzinho 
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//Nachtzinho 
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
};

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      
      if (entry.target.classList.contains("hero")) {
        setTimeout(animateCounters, 500);
      }
    }
  });
}, observerOptions);

//Nachtzinho 
function initAnimations() {
//Nachtzinho 
  document.querySelectorAll(".service-card, .feature-item, .brand-item, .testimonial-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });


  observer.observe(document.querySelector(".hero"));
}
//Nachtzinho 

function setupThemeToggle() {
  const themeToggles = [themeToggle, desktopThemeToggle];
  const currentTheme = localStorage.getItem("theme") || "light";
//Nachtzinho 

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    updateThemeText("Escuro");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    updateThemeText("Claro");
  }

  
  themeToggles.forEach(toggle => {
    if (toggle) {
      toggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        if (currentTheme === "light") {
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
          updateThemeText("Escuro");
          

          trackEvent('Theme', 'Change', 'Dark');
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
          updateThemeText("Claro");
          

          trackEvent('Theme', 'Change', 'Light');
        }
      });
    }
  });
}


function updateThemeText(theme) {
  const themeTexts = document.querySelectorAll(".theme-toggle-text");
  themeTexts.forEach(text => {
    text.textContent = theme;
  });
}

function setupServiceCardHover() {
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

function setupWhatsAppTracking() {
  const whatsappLinks = document.querySelectorAll('a[href*="whatsapp.com"], a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('WhatsApp', 'Click', link.href);
    });
  });
}


function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
  
l
  console.log(`Event: ${category} - ${action} - ${label}`);
}

document.addEventListener('DOMContentLoaded', function() {
  setupThemeToggle();
  setupServiceCardHover();
  setupWhatsAppTracking();
  
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('SW registered: ', registration);
      }).catch(function(registrationError) {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
});


console.log(`
🔧 Marcelo Manutenções - Website Especializado
📧 Desenvolvido para oferecer a melhor experiência
🚀 Especialista em equipamentos hidráulicos e pneumáticos
📊 Performance otimizada para todos os dispositivos
`);


window.addEventListener('load', function() {
 
  setTimeout(function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
    
    if (loadTime > 3000) {
      console.warn('Page load time is slower than optimal. Consider optimizing images and scripts.');
    }
  }, 0);
});


window.addEventListener('error', function(e) {
  console.error('Error occurred:', e.error);
  trackEvent('Error', 'JavaScript', e.message);
});


window.addEventListener('online', function() {
  console.log('You are now online!');
  showNotification('Conexão restaurada. Você está online novamente.', 'success');
});

window.addEventListener('offline', function() {
  console.log('You are now offline!');
  showNotification('Você está offline. Algumas funcionalidades podem não estar disponíveis.', 'warning');
});


const showNotification = (message, type = "info") => {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

  
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);
//Nachtzinho 
  
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);
//Nachtzinho 
 
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    `;

  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  });
//Nachtzinho 
 
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
};
//Nachtzinho 

const style = document.createElement("style");
style.textContent = `
    .form-group.focused label {
        color: var(--primary);
        transform: translateY(-2px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    /* Focus styles for accessibility */
    a:focus,
    button:focus,
    input:focus,
    textarea:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }
    
    /* Reduced motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
        
        .service-card,
        .brand-item,
        .testimonial-card {
            transition: none !important;
        }
    }
`;
document.head.appendChild(style);
//Nachtzinho 

document.addEventListener("keydown", (e) => {
  
  if (e.key === "Escape") {
    navList.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
    document.body.style.overflow = '';
  }
  
 //Nachtzinho 
  if (e.key === "Tab") {
    document.documentElement.classList.add('keyboard-nav');
  }
});

//Nachtzinho 
document.addEventListener("mousedown", () => {
  document.documentElement.classList.remove('keyboard-nav');
});

//Nachtzinho 