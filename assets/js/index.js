const slides = document.querySelector('.slider');
const slideCount = document.querySelectorAll('.slide').length;
const btnLeft = document.querySelector('.btn-slider-left');
const btnRight = document.querySelector('.btn-slider-right');
let currentIndex = 0;

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
btnLeft.addEventListener('click', function() {
    showPrevSlide();
});
btnRight.addEventListener('click', function() {
    showNextSlide();
});
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
window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});


const reviewInner = document.querySelector('.review-inner');
const reviewItems = document.querySelectorAll('.review-item');

let currentActive = 1; // Phần tử ban đầu ở giữa

function updateSlider() {
    // Đảm bảo trạng thái active được cập nhật
    reviewItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentActive);

        const img = document.createElement('img');
        img.src = './assets/images/review_03.png'; 
        img.alt = 'Image';

        // Nếu item có class active, thêm img vào đầu
        if (item.classList.contains('active')) {
            if (!item.querySelector('img')) {
                item.insertBefore(img, item.firstChild); 
            }
        } else {
            const existingImg = item.querySelector('img');
            if (existingImg) {
                existingImg.remove(); // Xóa img nếu không có class active
            }
        }
    });

    setTimeout(() => {
        const activeItem = reviewItems[currentActive];
        const containerWidth = reviewInner.offsetWidth;
        const activeItemWidth = activeItem.offsetWidth;

        // Tính toán khoảng cách dịch chuyển
        const translateX =
            activeItem.offsetLeft - containerWidth / 2 + activeItemWidth / 2;

        // Áp dụng transform
        reviewInner.style.transform = `translateX(${-translateX}px)`;
    }, 50); 
}

reviewItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentActive = index; 
        updateSlider();
    });
});

window.addEventListener('load', () => {
    updateSlider();
});
// setInterval(() => {
//     currentActive = (currentActive + 1) % reviewItems.length;
//     updateSlider();
// }, 3000);
