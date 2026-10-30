
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-bg-image");
    const cardImage = document.querySelector(".hero-card-image");
    const slideCount = document.querySelector(".hero-slide-count");
    const progress = document.querySelector(".hero-progress-fill");
    const nextButton = document.querySelector(".hero-next");
    const prevButton = document.querySelector(".hero-prev");

    if (!slides.length || !cardImage) return;

    // Images used in the floating card
    const cardImages = [
        "/assets/image2.png",
        "/assets/image3.png",
        "/assets/image1.png"
    ];

    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {
        slides.forEach((slide) => slide.classList.remove("active"));

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");

        // Change the floating card image
        cardImage.style.opacity = "0";

        setTimeout(() => {
            cardImage.src = cardImages[currentSlide];
            cardImage.style.opacity = "1";
        }, 300);

        // Update slide number
        slideCount.textContent = String(currentSlide + 1).padStart(2, "0");

        // Update progress
        progress.style.width =
            ((currentSlide + 1) / slides.length) * 100 + "%";

    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, 3000);
    }

    nextButton.addEventListener("click", () => {
        nextSlide();
        startSlider();
    });

    prevButton.addEventListener("click", () => {
        previousSlide();
        startSlider();
    });

    showSlide(0);
    startSlider();
});
















document.addEventListener("DOMContentLoaded", () => {

    const whySection = document.querySelector(".arshana-why-section");

    if (!whySection) return;

    const whyCards = whySection.querySelectorAll(".why-card");

    // Enable animation styles
    whySection.classList.add("why-motion-ready");

    const whyObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const card = entry.target;

                card.classList.add("why-card-visible");

                whyObserver.unobserve(card);
            }

        });

    }, {
        threshold: 0.15
    });

    whyCards.forEach((card) => {
        whyObserver.observe(card);
    });

});










// foooter css //////////////////////

const footerYear = document.getElementById("footer-current-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}