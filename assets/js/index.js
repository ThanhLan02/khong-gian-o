// slider image
const slides = document.querySelector('.slider');
const slideCount = document.querySelectorAll('.slide').length;
const btnLeft = document.querySelector('.btn-slider-left');
const btnRight = document.querySelector('.btn-slider-right');
let currentIndex = 0; // current

let isDragging = false; 
let startX = 0; 
let currentTranslate = 0; 
let prevTranslate = 0; 
function showNextSlide() {
    currentIndex++;
    if (currentIndex === slideCount) {
        currentIndex = 0;
    }
    updateSlidePosition();
}

function showPrevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slideCount - 1;
    }
    updateSlidePosition();
}
//-------Nút bấm sliders
btnLeft.addEventListener('click', function() {
    showPrevSlide();
});
btnRight.addEventListener('click', function() {
    showNextSlide();
});
//--------Kéo thả sliders
slides.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
function updateSlidePosition() {
    currentTranslate = -currentIndex * 100;
    slides.style.transform = `translateX(${currentTranslate}%)`;
    slides.style.transition = 'transform 0.3s ease-out';
}

slides.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    prevTranslate = currentTranslate;
    slides.style.transition = 'none';
});

slides.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + (deltaX / slides.offsetWidth) * 100;
    slides.style.transform = `translateX(${currentTranslate}%)`;
});

slides.addEventListener('mouseup', () => {
    isDragging = false;
    const threshold = 20;
    const diff = currentTranslate - prevTranslate;
    if (diff > threshold) {
        showPrevSlide();
    } else if (diff < -threshold) {
        showNextSlide();
    } else {
        slides.style.transform = `translateX(${prevTranslate}%)`; 
    }
});

slides.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        slides.style.transform = `translateX(${prevTranslate}%)`;
    }
});
//---------Kéo thả cho mobile---------
slides.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    prevTranslate = currentTranslate;
    slides.style.transition = 'none';
});

slides.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + (deltaX / slides.offsetWidth) * 100;
    slides.style.transform = `translateX(${currentTranslate}%)`;
});

slides.addEventListener('touchend', () => {
    isDragging = false;
    const threshold = 20;
    const diff = currentTranslate - prevTranslate;
    if (diff > threshold) {
        showPrevSlide();
    } else if (diff < -threshold) {
        showNextSlide();
    } else {
        slides.style.transform = `translateX(${prevTranslate}%)`;
    }
});
setInterval(showNextSlide, 5000); 

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const dropdownMenu = document.querySelector('.mobile-dropdown-menu');
    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.classList.toggle('show');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.mobile-dropdown-sub-toggle');
    const dropdownMenu = document.querySelector('.mobile-dropdown-sub-menu');
    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.classList.toggle('show-sub');
    });
});

// Sticky header 
window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

// Review click and slider 
const reviewInner = document.querySelector('.review-inner');
const reviewItems = document.querySelectorAll('.review-item');
let currentActive = 1;

let isDraggingReview = false;
let startXReview = 0;
let currentTranslateX = 0;
let prevTranslateX = 0;

function updateReview() {
  reviewItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentActive);
  });

  setTimeout(() => {
    const activeItem = reviewItems[currentActive];
    const containerWidth = reviewInner.offsetWidth;
    const activeItemWidth = activeItem.offsetWidth;
    const translateX = activeItem.offsetLeft - containerWidth / 2 + activeItemWidth / 2;
    currentTranslateX = -translateX;
    reviewInner.style.transform = `translateX(${currentTranslateX}px)`;
  }, 50);
}

reviewItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentActive = index;
    updateReview();
  });
});

// Drag and drop for mouse
reviewInner.addEventListener('mousedown', (e) => {
  isDraggingReview = true;
  startXReview = e.pageX;
  prevTranslateX = currentTranslateX;
  reviewInner.style.cursor = 'grabbing';
});
reviewInner.addEventListener('mousemove', (e) => {
  if (!isDraggingReview) return;
  e.preventDefault();
  const deltaX = e.pageX - startXReview;
  currentTranslateX = prevTranslateX + deltaX;
  reviewInner.style.transform = `translateX(${currentTranslateX}px)`;
});
reviewInner.addEventListener('mouseup', () => {
  isDraggingReview = false;
  reviewInner.style.cursor = 'grab';
  snapToClosestItem();
});
reviewInner.addEventListener('mouseleave', () => {
  if (isDraggingReview) {
    isDraggingReview = false;
    snapToClosestItem();
  }
  reviewInner.style.cursor = 'grab';
});

// Kéo thả mobile
reviewInner.addEventListener('touchstart', (e) => {
  isDraggingReview = true;
  startXReview = e.touches[0].pageX; n
  prevTranslateX = currentTranslateX;
  reviewInner.style.cursor = 'grabbing';
});
reviewInner.addEventListener('touchmove', (e) => {
  if (!isDraggingReview) return;
  e.preventDefault();
  const deltaX = e.touches[0].pageX - startXReview;
  currentTranslateX = prevTranslateX + deltaX;
  reviewInner.style.transform = `translateX(${currentTranslateX}px)`;
});
reviewInner.addEventListener('touchend', () => {
  isDraggingReview = false;
  snapToClosestItem();
});
reviewInner.addEventListener('touchcancel', () => {
  isDraggingReview = false;
  snapToClosestItem();
});

function snapToClosestItem() {
  let closestIndex = 0;
  let closestDistance = Infinity;

  reviewItems.forEach((item, index) => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const containerCenter = -currentTranslateX + reviewInner.offsetWidth / 2;
    const distance = Math.abs(containerCenter - itemCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  currentActive = closestIndex;
  updateReview();
}

window.addEventListener('load', () => {
  updateReview();
});


// setInterval(() => {
//     currentActive = (currentActive + 1) % reviewItems.length;
//     updateReview();
// }, 3000); 