document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const header = document.getElementById('header');
    const nextButton = document.querySelector('.slider-next');
    const prevButton = document.querySelector('.slider-prev');
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonials = testimonialTrack ? Array.from(testimonialTrack.children) : [];
    const contactForm = document.getElementById('contact-form');
    const consentCheckbox = document.getElementById('lgpd-consent');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.style.boxShadow = '0 18px 45px rgba(10, 25, 47, 0.12)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    let currentIndex = 0;
    let autoplayInterval = null;

    const updateSlider = (index) => {
        if (!testimonialTrack || testimonials.length === 0) return;

        const target = testimonials[index];
        testimonialTrack.scrollTo({
            left: target.offsetLeft - 16,
            behavior: 'smooth'
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider(currentIndex);
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider(currentIndex);
    };

    const startAutoplay = () => {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    };

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    if (testimonialTrack) {
        testimonialTrack.addEventListener('mouseenter', stopAutoplay);
        testimonialTrack.addEventListener('mouseleave', startAutoplay);
        window.addEventListener('resize', () => updateSlider(currentIndex));
        startAutoplay();
    }

    if (contactForm && consentCheckbox) {
        const submitButton = contactForm.querySelector('button[type="submit"]');

        const validateForm = () => {
            const isValid = contactForm.checkValidity() && consentCheckbox.checked;
            submitButton.disabled = !isValid;
        };

        contactForm.addEventListener('input', validateForm);
        consentCheckbox.addEventListener('change', validateForm);
        validateForm();

        contactForm.addEventListener('submit', (event) => {
            if (!contactForm.checkValidity() || !consentCheckbox.checked) {
                event.preventDefault();
                contactForm.reportValidity();
            }
        });
    }
});