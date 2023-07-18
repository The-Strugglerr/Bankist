'use strict';

//////////////////////////////////////////////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(button => {
  button.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////////////////////////////////////////////////////////////////

const header = document.querySelector('.header'); // selecting header

/////////////////////////////////////////////////////////////////////////////////
// add a element of cookies into the html using dom manipulation

const message = document.createElement('div');

message.classList.add('cookie-message');

message.innerHTML =
  'We used cookies for improved inner functionality and analytics <button class="btn btn--close-cookie">Get it</button>';

message.style.backgroundColor = '#37383d';
message.style.width = '104.3%';

// message.append(header);

header.append(message);
const closeCookie = document.querySelector('.btn--close-cookie');

closeCookie.addEventListener('click', () => {
  message.remove();
});

/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
// In this we will make learn more button dynamic by clicking on it we will redirect to section 1 of website

const btnScroll = document.querySelector('.btn--scroll-to');

const sec1 = document.querySelector('#section--1');
// console.log(sec1);

btnScroll.addEventListener('click', e => {
  sec1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// event delegation  methods that is smooth scrolling behaviour

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    console.log('hi');
  });
});

// but as you learn above this is bad practice so lets use delegation

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  //removing active classes
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });

  tabsContent.forEach(tabCon => {
    tabCon.classList.remove('operations__content--active');
  });

  //activate the tab
  clicked.classList.add('operations__tab--active');

  // activating the content

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// HOVER EFFECT ON THE NAVIAGATION MENU( here we learn to pass arguments as event handler functions)

const nav = document.querySelector('.nav');

const hoverEffect = (e, opa) => {
  console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const itemList = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    itemList.forEach(function (item) {
      if (item !== link) {
        item.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', function (e) {
  hoverEffect(e, 0.5); // this is a one way
});
nav.addEventListener('mouseout', function (e) {
  hoverEffect(e, 1); // this is a one way
});

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// implementation of sticky navigation

// we use scroll event here but it is old and bad so lets use the intersectiomn of server api
// we want that when we reach section one of our website over navigation panel become sticky that what we are trying to achive here

// const obsCallback = (entries, observer) => {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(sec1);

// what is the meaning of threshold simple when that sec part is  at 0 then this  call back will trigger when it reaches 20 per of view port means sec1 20 per is visivble in view port then this call back will triggernow then sec visibility is less then 20 per view port then it will trigger  and when sec1 compllete become invisble in view port then it will trigger call back fucntion.

// so we will add nav to sticky when our header got complete invisble to view port
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// section transition

const slowTransition = entries => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    secObserver.unobserve(entry.target);
  }
};

const options = {
  threshold: 0.15,
};

const secObserver = new IntersectionObserver(slowTransition, options);

const allSec = document.querySelectorAll('.section');

allSec.forEach(sec => {
  secObserver.observe(sec);
  // sec.classList.add('section--hidden');
});

////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// lazy loading

const highResImg = document.querySelectorAll('img[data-src]');

const imgTransition = entries => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      setTimeout(() => {
        entry.target.classList.remove('lazy-img');
        imgObserver.unobserve(entry.target);
      }, 300);
    });
  }
};

const values = {
  threshold: 0.5,
};

const imgObserver = new IntersectionObserver(imgTransition, values);

highResImg.forEach(img => {
  imgObserver.observe(img);
});

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
// working of slider

const mainSliderFuntion = () => {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const leftBtn = document.querySelector('.slider__btn--left');
  const rightBtn = document.querySelector('.slider__btn--right');
  const reversedSlides = Array.from(slides).reverse();
  let currentSlide = 0;
  const totalSize = slides.length - 1;

  const dotContainer = document.querySelector('.dots');

  // functionality of doing left right
  const slideAlgo = currentSlide => {
    reversedSlides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  };

  slideAlgo(0);

  // working of dots when we click dots ( adding event to them)
  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      slideAlgo(slide);
    }
  });

  // dot color function this will cahnge color of dot acc to selected slide
  const dotColor = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(element => {
      element.classList.remove('dots__dot--active');

      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    });
  };

  // left btn function
  const nextSlide = () => {
    if (currentSlide === totalSize) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    slideAlgo(currentSlide);
    dotColor(currentSlide);
  };

  // prev button function
  const prevSlide = () => {
    if (currentSlide === 0) {
      currentSlide = totalSize;
    } else {
      currentSlide--;
    }
    slideAlgo(currentSlide);
    dotColor(currentSlide);
  };

  // \event handler on press arrow keys
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
    e.key === 'ArrowLeft' && prevSlide();
  });

  // creating dots for every element in slider
  const createdotes = () => {
    slides.forEach((_, e) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${e}"></button>`
      );
    });
  };
  createdotes();

  // event related to left and right arrow button in slider
  leftBtn.addEventListener('click', prevSlide);

  rightBtn.addEventListener('click', nextSlide);
};

mainSliderFuntion();

/////////////////////////////////////////////////////////////////////////
