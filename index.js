const am = document.querySelector('.am');
const h = document.querySelector('.h');

let maxX, horizontalScrollHeight;
let amBaseTop, amTargetTop;
let hBaseTop, hTargetTop;

function updateMeasurements() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    maxX = viewportWidth - am.offsetWidth;
    horizontalScrollHeight = maxX;

    document.body.style.height = (viewportHeight + horizontalScrollHeight) + "px";

    const amRect = am.getBoundingClientRect();
    amBaseTop = amRect.top + window.scrollY;
    amTargetTop = viewportHeight * 0.26;

    const hRect = h.getBoundingClientRect();
    hBaseTop = hRect.top + window.scrollY;
    hTargetTop = viewportHeight * 0.30;
}

function onScroll() {
    const scrollY = window.scrollY;
    const horizontalPercent = Math.min(scrollY / horizontalScrollHeight, 1);

    const amX = horizontalPercent * maxX;
    const amYOffset = Math.min(scrollY, horizontalScrollHeight) + amTargetTop - amBaseTop;
    const hYOffset = Math.min(scrollY, horizontalScrollHeight) + hTargetTop - hBaseTop;

    am.style.transform = `translate(${amX}px, ${amYOffset}px)`;
    h.style.transform = `translateY(${hYOffset}px)`;
}

window.addEventListener('load', () => {
    updateMeasurements();
    onScroll(); 
});

window.addEventListener('resize', () => {
    updateMeasurements();
    onScroll(); 
});

window.addEventListener('scroll', onScroll);


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
  let baseWidth = 1440;
  let targetPx = 500;
  let scaledScroll = targetPx * (window.innerWidth / baseWidth);

  window.scrollTo({
    top: scaledScroll,
    behavior: "smooth"
  });
});

document.querySelector("#linkproj").addEventListener("click", () => {
  let baseWidth = 1440;
  let targetPx = 1500;
  let scaledScroll = targetPx * (window.innerWidth / baseWidth);

  window.scrollTo({
    top: scaledScroll,
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

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

document.querySelectorAll(".bi img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex"; 
    lightboxImg.src = img.src;       
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
const projTitle = document.getElementById("proj-title");
const triggerHeight = 1250; // change this to the scroll position you want

window.addEventListener("scroll", () => {
  if (window.scrollY >= triggerHeight) {
    projTitle.style.opacity = "1";
    projTitle.style.pointerEvents = "auto";
  } else {
    projTitle.style.opacity = "0";
    projTitle.style.pointerEvents = "none";
  }
});








