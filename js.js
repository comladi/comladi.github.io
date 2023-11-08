document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slideshow img");
    let currentSlide = 0;

    function showSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.classList.remove("active");
            if (index === slideIndex) {
                slide.classList.add("active");
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide);
        currentSlide = (currentSlide + 1) % slides.length;
        setTimeout(nextSlide, 12000); // 12 seconds (7s + 5s)
    }

    nextSlide();
});
