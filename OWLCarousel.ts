// script.ts

document.addEventListener("DOMContentLoaded", function () {
    const owlCarousel = $(".owl-carousel") as any;
    
    owlCarousel.owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 1000,
      autoplayHoverPause: true,
      items: 1
    });
  });
  