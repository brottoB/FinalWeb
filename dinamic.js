 
  
    // Al cargar la página, forzamos que se muestre la sección "Inicio"
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'; // Desactiva la restauración automática del scroll
    }

    window.addEventListener('load', function () {
      setTimeout(() => {
        const scrollContainer = document.getElementById("scrollContainer");
        const inicioSection = document.getElementById("inicio");
        if (scrollContainer && inicioSection) {
          scrollContainer.scrollTo({
            top: 0, // Desplázate al inicio del contenedor
            behavior: "smooth" // Desplazamiento suave
          });
        }
        // Inicializa la categoría "diseno" en el portafolio
        changeCategory('diseno');
      }, 100); // Retraso de 100ms
    });

    // Variables globales
    const slides = ["img/way.png", "img/fondo.png", "img/simbolo-magico.png", "img/glitch-bg.png"];
    const slider = document.getElementById("slider");
    const buttons = document.querySelectorAll(".sidebar button");
    let currentSlide = 0;
    let autoSlideTimer = null; // Temporizador principal
    let isPaused = false; // Indicador para pausar/reanudar el slider

    // Muestra una diapositiva específica
    let isTransitioning = false; // Añade esto justo arriba de tu función showSlide

    function showSlide(index) {
      if (isTransitioning) return; // Bloquea si ya está cambiando

      isTransitioning = true; // Marca como en transición

      currentSlide = (index + slides.length) % slides.length;
      slider.style.opacity = 0;

      setTimeout(() => {
        slider.innerHTML = `<img src="${slides[currentSlide]}" alt="Slide ${currentSlide + 1}">`;
        slider.style.opacity = 1;
        isTransitioning = false; // Libera el bloqueo
      }, 300); // Tiempo para animación de opacidad

      // Actualiza los botones
      buttons.forEach((btn, i) => {
        btn.classList.toggle("active", i === currentSlide);
      });

      resetAutoSlide(); // Reinicia el temporizador automático
    }

    // Cambia automáticamente las diapositivas
    function autoSlide() {
      if (isPaused) return; // No cambia la imagen si el slider está pausado

      currentSlide = (currentSlide + 1) % slides.length; // Incrementa el índice secuencialmente
      console.log(`⏩ Cambiando a la diapositiva ${currentSlide + 1}`);
      showSlide(currentSlide); // Muestra la siguiente diapositiva
    }

    // Reinicia el temporizador del slider automático
    function resetAutoSlide() {
      clearInterval(autoSlideTimer); // Detén el temporizador anterior
      autoSlideTimer = setInterval(autoSlide, 5000); // Inicia un nuevo temporizador (5 segundos)
      console.log("▶️ Temporizador reanudado");
    }

    // Observador para pausar el slider si no está visible en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            clearInterval(autoSlideTimer);
            isPaused = true;
            console.log("🚫 Slider oculto: se pausa autoSlide");
          } else {
            isPaused = false;
            resetAutoSlide();
            console.log("👁️ Slider visible: se reanuda autoSlide");
          }
        });
      },
      {
        threshold: 0.5, // Se considera visible si al menos el 50% del slider está en pantalla
      }
    );

    // Aplica el observer al slider
    observer.observe(slider);

    // Pausar o reanudar el slider según la visibilidad de la pestaña
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        clearInterval(autoSlideTimer); // Detén el temporizador si la pestaña está en segundo plano
        isPaused = true; // Pausa el slider
        console.log("⏸️ Slider pausado: pestaña en segundo plano");
      } else {
        isPaused = false; // Reanuda el slider
        resetAutoSlide(); // Reanuda el temporizador si la pestaña está activa
        console.log("▶️ Slider reanudado: pestaña activa");
      }
    });

    // Inicializar el slider
    showSlide(0); // Muestra la primera diapositiva
    resetAutoSlide(); // Inicia el temporizador al cargar la página

    // Alterna el menú móvil
    function toggleMobileMenu() {
      const mobileMenu = document.getElementById("mobileMenu");
      mobileMenu.classList.toggle("active");
    }

    // Navega a una sección específica
    function navigateToSection(sectionId) {
      const target = document.getElementById(sectionId);
      if (target) {
        const scrollContainer = document.getElementById("scrollContainer");
        scrollContainer.scrollTo({
          left: target.offsetLeft,
          behavior: "smooth",
        });
      }
    }

    // Datos del portafolio
    const portfolioData = {
      diseno: [
        { img: "img/way.png", alt: "Proyecto 1", title: "Diseño Web - Proyecto 1" },
        { img: "/img/proyecto2.jpg", alt: "Proyecto 2", title: "Diseño Web - Proyecto 2" },
        { img: "/img/proyecto3.jpg", alt: "Proyecto 3", title: "Diseño Web - Proyecto 3" },
        { img: "/img/proyecto4.jpg", alt: "Proyecto 4", title: "Diseño Web - Proyecto 4" },
        { img: "/img/proyecto5.jpg", alt: "Proyecto 5", title: "Diseño Web - Proyecto 5" },
        { img: "/img/proyecto6.jpg", alt: "Proyecto 6", title: "Diseño Web - Proyecto 6" },
        
      ],
      animaciones: [
        { img: "/img/animacion1.jpg", alt: "Animación 1", title: "Animaciones - Proyecto 1" },
        { img: "/img/animacion2.jpg", alt: "Animación 2", title: "Animaciones - Proyecto 2" },
        { img: "/img/animacion3.jpg", alt: "Animación 3", title: "Animaciones - Proyecto 3" },
        { img: "/img/animacion4.jpg", alt: "Animación 4", title: "Animaciones - Proyecto 4" },
        { img: "/img/animacion5.jpg", alt: "Animación 5", title: "Animaciones - Proyecto 5" },
        { img: "/img/animacion6.jpg", alt: "Animación 6", title: "Animaciones - Proyecto 6" },
      ],
      ilustraciones: [
        { img: "/img/ilustracion1.jpg", alt: "Ilustración 1", title: "Ilustraciones - Proyecto 1" },
        { img: "/img/ilustracion2.jpg", alt: "Ilustración 2", title: "Ilustraciones - Proyecto 2" },
        { img: "/img/ilustracion3.jpg", alt: "Ilustración 3", title: "Ilustraciones - Proyecto 3" },
        { img: "/img/ilustracion4.jpg", alt: "Ilustración 4", title: "Ilustraciones - Proyecto 4" },
        { img: "/img/ilustracion5.jpg", alt: "Ilustración 5", title: "Ilustraciones - Proyecto 5" },
        { img: "/img/ilustracion6.jpg", alt: "Ilustración 6", title: "Ilustraciones - Proyecto 6" },
      ],
    };

    // Cambia la categoría del portafolio
    function changeCategory(category) {
      console.log(`Cargando categoría: ${category}`); // Para depuración
      // Actualiza la clase 'active' en el menú
      const navItems = document.querySelectorAll(".portfolio-nav li");
      navItems.forEach((item) => item.classList.remove("active"));
      const targetItem = document.querySelector(`.portfolio-nav li[data-category="${category}"]`);
      if (targetItem) {
        targetItem.classList.add("active");
      }

      // Actualiza dinámicamente el contenido del portafolio
      const grid = document.querySelector(".portfolio-grid");
      grid.innerHTML = portfolioData[category]
        .map(
          (project) => `
            <div class="portfolio-item">
              <img src="${project.img}" alt="${project.alt}">
              <span>${project.title}</span>
            </div>
          `
        )
        .join("");
    }
