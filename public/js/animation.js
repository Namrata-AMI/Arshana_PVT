// why choose us //


document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".arshana-why-section");

    if (!section || !window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const image = section.querySelector(".why-central-image");
    const cards = gsap.utils.toArray(section.querySelectorAll(".why-card"));

    if (!image || !cards.length) return;

    // Reveal central image first
    gsap.set(image, {
        autoAlpha: 0,
        scale: 0.82,
        y: 35,
        filter: "blur(12px)"
    });

    // Cards begin at the bottom-centre
    cards.forEach((card, index) => {
        const total = cards.length;
        const angle = Math.PI - (index / (total - 1)) * Math.PI;

        const radius = 230;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.set(card, {
            autoAlpha: 0,
            x: -x,
            y: radius,
            scale: 0.65,
            rotation: (index - (total - 1) / 2) * 5,
            filter: "blur(10px)",
            transformOrigin: "center center"
        });

        card.dataset.arcX = x;
        card.dataset.arcY = y;
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 65%",
            once: true
        }
    });

    // Image entrance
    tl.to(image, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.3,
        ease: "power3.out"
    });

    // Cards spread outward in sequence
    cards.forEach((card, index) => {
        tl.to(card, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "back.out(1.4)"
        }, `-=${index === 0 ? 0 : 0.62}`);
    });
});


















////// text animation ///////////


document.addEventListener("DOMContentLoaded", () => {

    if (!window.gsap || !window.ScrollTrigger || !window.SplitText) {
        console.warn("GSAP animation libraries are not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;


    /* =========================================
       1. REUSABLE HEADING REVEAL
    ========================================= */

    function revealHeading(element, options = {}) {
        if (!element) return;

        const split = SplitText.create(element, {
            type: "lines,words",
            mask: "lines",
            wordsClass: "arshana-heading-word"
        });

        gsap.from(split.words, {
            yPercent: 115,
            opacity: 0,
            duration: options.duration || 1.15,
            stagger: options.stagger || 0.055,
            ease: "power4.out",
            delay: options.delay || 0,

            scrollTrigger: options.trigger ? {
                trigger: options.trigger,
                start: options.start || "top 78%",
                once: true
            } : undefined
        });

        return split;
    }


    /* =========================================
       2. HERO — CINEMATIC TEXT REVEAL
    ========================================= */

    const hero = document.querySelector(".arshana-hero");

    if (hero) {

        const heroHeading = hero.querySelector(
            ".hero-heading-area h1"
        );

        const heroLabel = hero.querySelector(".hero-top-label");
        const heroDescription = hero.querySelector(
            ".hero-description-area p"
        );
        const heroSideLabel = hero.querySelector(".hero-side-label");
        const heroButton = hero.querySelector(".hero-secondary-btn");
        const heroBottom = hero.querySelector(".hero-bottom-line");
        const featureCard = hero.querySelector(".hero-feature-card");

        // Main heading
        if (heroHeading) {
            const split = SplitText.create(heroHeading, {
                type: "lines,words",
                mask: "lines",
                wordsClass: "arshana-heading-word"
            });

            gsap.from(split.words, {
                yPercent: 120,
                opacity: 0,
                duration: 1.25,
                stagger: 0.07,
                ease: "power4.out",
                delay: 0.35
            });
        }

        // Top label
        gsap.from(heroLabel, {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.2
        });

        // Right side label and paragraph
        gsap.from([heroSideLabel, heroDescription, heroButton], {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.16,
            ease: "power3.out",
            delay: 0.9
        });

        // Bottom technical line
        gsap.from(heroBottom, {
            y: 25,
            opacity: 0,
            duration: 0.9,
            delay: 1.2,
            ease: "power3.out"
        });

        // Floating feature card
        gsap.from(featureCard, {
            y: 65,
            opacity: 0,
            scale: 0.96,
            duration: 1.2,
            delay: 1,
            ease: "power3.out"
        });
    }


    /* =========================================
       3. WHY CHOOSE US — HEADING
    ========================================= */

    const whySection = document.querySelector(
        ".arshana-why-section"
    );

    if (whySection) {

        const heading = whySection.querySelector(
            ".why-section-heading h2"
        );

        const eyebrow = whySection.querySelector(".why-eyebrow");
        const paragraph = whySection.querySelector(
            ".why-section-heading p"
        );

        revealHeading(heading, {
            trigger: whySection,
            start: "top 75%",
            stagger: 0.065
        });

        gsap.from([eyebrow, paragraph], {
            y: 25,
            opacity: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: whySection,
                start: "top 75%",
                once: true
            }
        });
    }


    /* =========================================
       4. WHY CHOOSE US — IMAGE AND CARDS
    ========================================= */

    if (whySection) {

        const wrapper = whySection.querySelector(
            ".why-visual-wrapper"
        );

        const image = whySection.querySelector(
            ".why-central-image"
        );

        const cards = gsap.utils.toArray(
            whySection.querySelectorAll(".why-card")
        );

        if (wrapper && image && cards.length) {

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 72%",
                    once: true
                }
            });

            // Image reveal
            gsap.set(image, {
                opacity: 0,
                scale: 0.88,
                y: 35,
                filter: "blur(12px)"
            });

            timeline.to(image, {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.4,
                ease: "power3.out"
            });

            // Cards emerge from a common bottom-centre origin
            const wrapperRect = wrapper.getBoundingClientRect();

            cards.forEach((card, index) => {

                const cardRect = card.getBoundingClientRect();

                const originX =
                    wrapperRect.width / 2 -
                    (cardRect.left - wrapperRect.left) -
                    cardRect.width / 2;

                const originY =
                    wrapperRect.height -
                    (cardRect.top - wrapperRect.top) -
                    cardRect.height / 2;

                const direction = card.classList.contains(
                    "why-card-left"
                ) ? -1 : 1;

                gsap.set(card, {
                    opacity: 0,
                    x: originX,
                    y: originY,
                    scale: 0.72,
                    rotation: direction * 7,
                    filter: "blur(8px)"
                });

                timeline.to(card, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power3.out"
                }, `-=${index === 0 ? 0 : 0.72}`);
            });

        }
    }


    /* =========================================
       5. WHY CHOOSE US — BOTTOM STATEMENT
    ========================================= */

    const whyBottom = document.querySelector(".why-bottom-line");

    if (whyBottom) {
        gsap.from(whyBottom.children, {
            y: 25,
            opacity: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: whyBottom,
                start: "top 90%",
                once: true
            }
        });
    }


    /* =========================================
       6. CAPABILITIES — HEADING REVEAL
    ========================================= */

    const capability = document.querySelector(
        ".arshana-capability-section"
    );

    if (capability) {

        const heading = capability.querySelector(
            ".capability-content h2"
        );

        const eyebrow = capability.querySelector(
            ".capability-eyebrow"
        );

        revealHeading(heading, {
            trigger: capability,
            start: "top 75%",
            stagger: 0.065
        });

        gsap.from(eyebrow, {
            y: 25,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: capability,
                start: "top 75%",
                once: true
            }
        });
    }


    /* =========================================
       7. CAPABILITIES — CONTENT SEQUENCE
    ========================================= */

    if (capability) {

        const highlight = capability.querySelector(
            ".capability-highlight"
        );

        const description = capability.querySelector(
            ".capability-description"
        );

        const button = capability.querySelector(
            ".capability-cta"
        );

        const mainImage = capability.querySelector(
            ".capability-main-image"
        );

        const sideItems = gsap.utils.toArray(
            capability.querySelectorAll(".capability-side-item")
        );

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: capability,
                start: "top 70%",
                once: true
            }
        });

        tl.from(highlight, {
            x: -45,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        tl.from(description, {
            y: 25,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out"
        }, "-=0.55");

        tl.from(button, {
            y: 20,
            opacity: 0,
            duration: 0.75
        }, "-=0.45");

        // Main image reveal
        if (mainImage) {
            tl.from(mainImage, {
                scale: 0.92,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1.2,
                ease: "power3.out"
            }, 0);
        }

        // Side detail tiles
        tl.from(sideItems, {
            x: 25,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.65");
    }


    /* =========================================
       8. CAPABILITIES — BOTTOM LINE
    ========================================= */

    const capabilityBottom = document.querySelector(
        ".capability-bottom"
    );

    if (capabilityBottom) {
        gsap.from(capabilityBottom.children, {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: capabilityBottom,
                start: "top 90%",
                once: true
            }
        });
    }


    /* =========================================
       9. REFRESH AFTER IMAGES LOAD
    ========================================= */

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

});













// ==========================================
// ARSHANA — HERO IMAGE SLIDER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".arshana-hero");

    if (!hero) return;

    const slides = Array.from(
        hero.querySelectorAll(".hero-bg-image")
    );

    const prevButton = hero.querySelector(".hero-prev");
    const nextButton = hero.querySelector(".hero-next");
    const progress = hero.querySelector(".hero-progress-fill");
    const slideCount = hero.querySelector(".hero-slide-count");

    if (slides.length < 2) return;

    let currentIndex = 0;
    let sliderInterval;

    const duration = 1800;

    function showSlide(index) {

        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });

        if (slideCount) {
            slideCount.textContent =
                `0${currentIndex + 1}`;
        }

        if (progress) {
            progress.style.transition = "none";
            progress.style.width = "0%";

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    progress.style.transition =
                        `width ${duration}ms linear`;
                    progress.style.width = "100%";
                });
            });
        }
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function previousSlide() {
        showSlide(currentIndex - 1);
    }

    function startSlider() {
        clearInterval(sliderInterval);
        showSlide(currentIndex);

        sliderInterval = setInterval(nextSlide, duration);
    }

    nextButton?.addEventListener("click", () => {
        nextSlide();
        startSlider();
    });

    prevButton?.addEventListener("click", () => {
        previousSlide();
        startSlider();
    });

    startSlider();

});











































/////////////////////////////  about js //////////////////////////////




/* ARSHANA — TILTING CARD ENTRANCE */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".ar-card");

  if (!cards.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("ar-card-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12
  });

  cards.forEach((card) => observer.observe(card));
});














/////////////////////////////// services css ////////////////////////////////





document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".ar-services");

  if (!page) return;

  const revealElements = page.querySelectorAll(`
    .service-directory,
    .service-details,
    .service-detail-card,
    .service-process,
    .service-cta
  `);

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  page.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = page.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});




const revealElements = page.querySelectorAll(`
  .service-directory,
  .service-details,
  .service-detail-card,
  .service-process,
  .service-cta
`);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});































// foooter css //////////////////////

const footerYear = document.getElementById("footer-current-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}