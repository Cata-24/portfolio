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

document.addEventListener("scroll", () => {
    const section = document.querySelector(".horizontal-section");
    const track = document.querySelector(".horizontal-track");

    const marginFix = parseFloat(getComputedStyle(section).marginTop);
    const start = section.offsetTop - marginFix;
    const end = start + section.offsetHeight - window.innerHeight;

    const progress = Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1);

    const maxTranslate = track.scrollWidth - window.innerWidth;

    track.style.transform = `translateX(-${progress * maxTranslate}px)`;
});

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








