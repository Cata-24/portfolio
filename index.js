const am = document.querySelector('.am');
const h = document.querySelector('.h');
const maxX = window.innerWidth - am.offsetWidth;
const horizontalScrollHeight = maxX; 

document.body.style.height = window.innerHeight + horizontalScrollHeight + "px";

const amBaseTop = am.getBoundingClientRect().top + window.scrollY;
const amTargetTop = window.innerHeight * 0.35;
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





