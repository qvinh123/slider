const slides = document.querySelectorAll(".slide")
const slider = document.querySelector(".slider")
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

slider.style.transform = 'scale(0.4)'
// slider.style.overflow = 'visible'


let curSlide = 0
let maxSlide = slides.length

const createDots = function () {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};

const activeDot = function (slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));

    // console.log(document.querySelector(`.dots__dot[data-slide="${slide}"]`))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};


const gotoSlide = function (slide) {
    slides.forEach((s, i) => {
        s.style.transform = `translate(${100 * (i - slide)}%)`
    })
}

const init = function () {
    gotoSlide(0);
    createDots();

    activeDot(0);
};
init();

const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0
    } else {
        curSlide++
    }

    gotoSlide(curSlide)
    activeDot(curSlide)
}

const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1
    } else {
        curSlide--
    }

    gotoSlide(curSlide)
    activeDot(curSlide)
}

dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset
        gotoSlide(slide)
        activeDot(slide)
    }
})

btnRight.addEventListener("click", nextSlide)

btnLeft.addEventListener("click", prevSlide)

document.addEventListener("keydown", function (e) {
    // console.log(e)
    e.key === "ArrowRight" && nextSlide()

    e.key === "ArrowLeft" && prevSlide()

})