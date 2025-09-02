const am = document.querySelector('.am');
const h = document.querySelector('.h');
const maxX = window.innerWidth - am.offsetWidth;
const horizontalScrollHeight = maxX; 

document.body.style.height = window.innerHeight + horizontalScrollHeight + "px";

const amBaseTop = am.getBoundingClientRect().top + window.scrollY;
const amTargetTop = window.innerHeight * 0.30;
const hBaseTop = h.getBoundingClientRect().top + window.scrollY;
const hTargetTop = window.innerHeight * 0.37;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const horizontalPercent = Math.min(scrollY / horizontalScrollHeight, 1);
    const amX = horizontalPercent * maxX;
    const amYOffset = Math.min(scrollY, horizontalScrollHeight) + amTargetTop - amBaseTop;
    const hYOffset = Math.min(scrollY, horizontalScrollHeight) + hTargetTop - hBaseTop;

    am.style.transform = `translate(${amX}px, ${amYOffset}px)`;
    h.style.transform = `translateY(${hYOffset}px)`;
});

document.querySelectorAll(".bi").forEach(box => {
  const img = box.querySelector("img");

function update() {
    const rect = box.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const progress = Math.min(Math.max(1 - rect.bottom / (viewHeight + rect.height), 0), 1);
    const translate = 20 - 40 * progress;
    img.style.transform = `translateY(${translate}%)`;

    requestAnimationFrame(update);
  }

  update();
});

document.querySelector("#linkabout").addEventListener("click", () => {
  window.scrollTo({
    top: 500,
    behavior: "smooth"
  });
});

document.querySelector("#linkproj").addEventListener("click", () => {
  window.scrollTo({
    top: 1600,
    behavior: "smooth"
  });
});

const slideIndices = {};

function plusSlides(n, sliderId) {
    if (!(sliderId in slideIndices)) slideIndices[sliderId] = 1;
    showSlides(slideIndices[sliderId] += n, sliderId);
}

function showSlides(n, sliderId) {
    let slides = document.querySelectorAll(`.slider[data-slider-id="${sliderId}"] .slide`);
    if (!slides || slides.length === 0) return;

    if (n > slides.length) slideIndices[sliderId] = 1;
    if (n < 1) slideIndices[sliderId] = slides.length;

    slides.forEach(slide => slide.style.display = "none");

    slides[slideIndices[sliderId] - 1].style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".slider").forEach(slider => {
        const sliderId = slider.dataset.sliderId;
        slideIndices[sliderId] = 1;
        showSlides(1, sliderId);
    });
});






