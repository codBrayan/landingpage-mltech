document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const header = document.getElementById('header');
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

    let sliderAnimation = null;
    const testimonialTemplate = testimonialTrack ? testimonialTrack.innerHTML : '';

    const createInfiniteAnimation = () => {
        if (!testimonialTrack || testimonials.length === 0) return;

        testimonialTrack.innerHTML = testimonialTemplate;
        const originalSlides = Array.from(testimonialTrack.children);
        originalSlides.forEach(card => testimonialTrack.appendChild(card.cloneNode(true)));

        const fullWidth = testimonialTrack.scrollWidth / 2;
        const duration = Math.max(20000, fullWidth * 20);

        if (sliderAnimation) {
            sliderAnimation.cancel();
        }

        sliderAnimation = testimonialTrack.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(-${fullWidth}px)` }
        ], {
            duration,
            iterations: Infinity,
            easing: 'linear'
        });
    };

    if (testimonialTrack) {
        createInfiniteAnimation();
        window.addEventListener('resize', () => createInfiniteAnimation());
    }

    if (testimonialTrack) {
        testimonialTrack.addEventListener('mouseenter', () => sliderAnimation?.pause());
        testimonialTrack.addEventListener('mouseleave', () => sliderAnimation?.play());
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