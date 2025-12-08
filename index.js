document.addEventListener("scroll", () => {
    const container = document.querySelector(".scroll-img-container");
    const img = container.querySelector("img");

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
        const percentage = (windowHeight - rect.top) / (windowHeight + rect.height);
        img.style.transform = `translateY(${percentage * -120}px)`;
    }
});

(() => {
  const section = document.querySelector(".horizontal-section");
  const wrapper = document.querySelector(".sticky-wrapper");
  const track = document.querySelector(".horizontal-track");

  if (!section || !wrapper || !track) return;

  let maxTranslate = 0;
  let sectionTop = 0;

function recalc() {
  sectionTop = section.offsetTop;
  maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);

  const extraVerticalScroll = -8; // in vh
  const totalHeightVh = 100 + pxToVh(maxTranslate) + extraVerticalScroll;

  section.style.height = totalHeightVh + "vh";
}

// helper functions
function pxToVh(px) {
  return (px / window.innerHeight) * 100;
}

function pxToVw(px) {
  return (px / window.innerWidth) * 100;
}


  function onScroll() {
    const scrollY = window.scrollY;
    const start = sectionTop;
    const end = sectionTop + maxTranslate;

    if (scrollY >= start && scrollY <= end) {
      // Scroll horizontal ativo
      wrapper.style.position = "fixed";
      wrapper.style.top = "0";
      wrapper.style.left = "0";
      wrapper.style.width = "100%";

      const progress = (scrollY - start) / maxTranslate;
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    } else if (scrollY < start) {
      // Antes da seção
      wrapper.style.position = "relative";
      track.style.transform = "translateX(0)";
    } else {
      // Depois da seção: scroll vertical normal
      wrapper.style.position = "relative";
      wrapper.style.top = "";
      track.style.transform = `translateX(-${maxTranslate}px)`;
    }
  }

  window.addEventListener("load", recalc);
  window.addEventListener("resize", recalc);
  document.addEventListener("scroll", onScroll, { passive: true });
})();



document.querySelector("#linkabout").addEventListener("click", () => {
  const targetElement = document.querySelector("#about"); 

  window.scrollTo({
    top: targetElement.offsetTop, 
    behavior: "smooth"
  });
});

document.querySelector("#linkproj").addEventListener("click", () => {
  const targetElement = document.querySelector("#projects"); 

  window.scrollTo({
    top: targetElement.offsetTop, 
    behavior: "smooth"
  });
});

const sliders = document.querySelectorAll('.slider-container');

sliders.forEach(container => {
    const slides = container.querySelector('.slides');
    let images = slides.querySelectorAll('img');

    // Clone first & last images for smooth looping
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);

    slides.appendChild(firstClone);
    slides.insertBefore(lastClone, images[0]);

    images = slides.querySelectorAll('img');

    let index = 1;
    const total = images.length;

    // Start in the "real" first image
    slides.style.transform = `translateX(-${index * 100}%)`;

    const prevBtn = container.parentElement.querySelector('.prev-btn');
    const nextBtn = container.parentElement.querySelector('.next-btn');

    function moveToIndex() {
        slides.style.transition = "transform 0.4s ease-in-out";
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (index >= total - 1) return; 
        index++;
        moveToIndex();
    });

    prevBtn.addEventListener('click', () => {
        if (index <= 0) return;
        index--;
        moveToIndex();
    });

    // When sliding ends, jump instantly (no animation) to real first/last
    slides.addEventListener('transitionend', () => {
        if (images[index] === firstClone) {
            slides.style.transition = "none";
            index = 1;
            slides.style.transform = `translateX(-${index * 100}%)`;
        }
        if (images[index] === lastClone) {
            slides.style.transition = "none";
            index = total - 2;
            slides.style.transform = `translateX(-${index * 100}%)`;
        }
    });
});








