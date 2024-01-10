// script.ts
document.addEventListener("DOMContentLoaded", function () {
    var owlCarousel = $(".owl-carousel");
    owlCarousel.owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        items: 1
    });
});
