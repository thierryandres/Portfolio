document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");

    if (navToggle && nav) {
        const toggleNav = () => {
            const isOpen = nav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        };

        navToggle.addEventListener("click", toggleNav);
        nav.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.closest("a")) {
                nav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    const contactForm = document.querySelector("#contact");
    const formMessage = document.querySelector("[data-form-message]");

    if (contactForm instanceof HTMLFormElement) {
        contactForm.addEventListener("submit", (event) => {
            if (!contactForm.checkValidity()) {
                event.preventDefault();

                if (typeof contactForm.reportValidity === "function") {
                    contactForm.reportValidity();
                }

                if (formMessage) {
                    formMessage.textContent = "Bitte fuellen Sie alle Pflichtfelder korrekt aus.";
                    formMessage.classList.add("error");
                    formMessage.classList.remove("success");
                }

                return;
            }

            if (!contactForm.dataset.remote) {
                event.preventDefault();
                contactForm.reset();

                if (formMessage) {
                    formMessage.textContent = "Vielen Dank! Ihre Nachricht wurde erfolgreich uebermittelt.";
                    formMessage.classList.add("success");
                    formMessage.classList.remove("error");
                }
            }
        });
    }

    const slider = document.querySelector("[data-slider]");

    if (slider) {
        const slidesContainer = slider.querySelector("[data-slides]");
        const slides = slidesContainer ? Array.from(slidesContainer.children) : [];
        const prevButton = slider.querySelector("[data-slide-prev]");
        const nextButton = slider.querySelector("[data-slide-next]");
        let currentIndex = 0;

        const updateSlider = () => {
            if (!(slidesContainer instanceof HTMLElement)) {
                return;
            }

            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const goToSlide = (index) => {
            if (slides.length === 0) {
                return;
            }
            currentIndex = (index + slides.length) % slides.length;
            updateSlider();
        };

        prevButton?.addEventListener("click", () => {
            goToSlide(currentIndex - 1);
        });

        nextButton?.addEventListener("click", () => {
            goToSlide(currentIndex + 1);
        });

        updateSlider();
    }
});
