
/* =========================================
   ARSHANA — ABOUT PAGE ANIMATIONS
========================================= */

(() => {
    "use strict";

    const initAnimations = () => {
        const revealElements = document.querySelectorAll(".reveal");

        if (!revealElements.length) return;

        // Respect the visitor's accessibility preferences.
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion || !("IntersectionObserver" in window)) {
            revealElements.forEach((element) => {
                element.classList.add("is-visible");
            });

            return;
        }

        // Enable reveal styling only when animation support is ready.
        document.documentElement.classList.add("has-reveal");

        // Stagger cards and list items for a subtle editorial effect.
        const groups = [
            ".values-grid",
            ".purpose-grid",
            ".approach-list"
        ];

        groups.forEach((selector) => {
            document.querySelectorAll(selector).forEach((group) => {
                const children = group.querySelectorAll(".reveal");

                children.forEach((element, index) => {
                    element.style.setProperty(
                        "--reveal-delay",
                        `${Math.min(index * 100, 300)}ms`
                    );
                });
            });
        });

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    // Animate once; avoid repeated movement on scroll.
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initAnimations,
            { once: true }
        );
    } else {
        initAnimations();
    }
})();
