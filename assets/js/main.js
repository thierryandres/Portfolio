(() => {
    const THEME_KEY = "portfolio-theme";
    const ACCENT_KEY = "portfolio-accent";
    const KONAMI = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a"
    ];

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.addEventListener("DOMContentLoaded", () => {
        initThemeToggle();
        initMobileNav();
        initRevealObserver();
        initTypewriter();
        initGalleryLightbox();
        initRandomFact();
        initMoodSwitcher();
        initQuiz();
        initKonamiConfetti();
        initParticles();
        initHomeEntrance();
        initScrollProgress();
        initHeaderScrollState();
        setFooterYear();
    });

    function initThemeToggle() {
        const root = document.documentElement;
        const toggles = document.querySelectorAll("[data-theme-toggle]");
        const readStoredTheme = () => {
            try {
                return localStorage.getItem(THEME_KEY);
            } catch {
                return null;
            }
        };
        const storeTheme = (theme) => {
            try {
                localStorage.setItem(THEME_KEY, theme);
            } catch {
                // Ignore write failures (private mode / blocked storage)
            }
        };

        const savedTheme = readStoredTheme();
        const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : root.dataset.theme || "dark";
        applyTheme(initialTheme);

        toggles.forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
                applyTheme(nextTheme);
                storeTheme(nextTheme);
            });
        });

        function applyTheme(theme) {
            root.dataset.theme = theme;
            const pressed = theme === "light";
            toggles.forEach((toggle) => {
                toggle.setAttribute("aria-pressed", String(pressed));
                toggle.setAttribute(
                    "aria-label",
                    theme === "dark" ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"
                );
                const glyph = toggle.querySelector(".theme-toggle__glyph");
                if (glyph) {
                    glyph.textContent = theme === "dark" ? "◐" : "◑";
                }
            });
        }
    }

    function initMobileNav() {
        const navToggle = document.querySelector("[data-nav-toggle]");
        const navPanel = document.querySelector("[data-nav-panel]");

        if (!(navToggle instanceof HTMLButtonElement) || !(navPanel instanceof HTMLElement)) {
            return;
        }

        const closeNav = () => {
            navPanel.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        };

        navToggle.addEventListener("click", () => {
            const open = !navPanel.classList.contains("open");
            navPanel.classList.toggle("open", open);
            navToggle.setAttribute("aria-expanded", String(open));
        });

        navPanel.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.closest("a")) {
                closeNav();
            }
        });

        document.addEventListener("click", (event) => {
            if (!(event.target instanceof Node)) {
                return;
            }
            if (!navPanel.contains(event.target) && !navToggle.contains(event.target)) {
                closeNav();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeNav();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 980) {
                closeNav();
            }
        });
    }

    function initRevealObserver() {
        const revealItems = document.querySelectorAll("[data-reveal]");
        if (!revealItems.length) {
            return;
        }

        if (reduceMotion || !("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: "0px 0px -10% 0px",
                threshold: 0.18
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    }

    function initTypewriter() {
        const target = document.querySelector("[data-typewriter]");
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const text = target.dataset.typewriter || "";
        if (!text) {
            return;
        }

        if (reduceMotion) {
            target.textContent = text;
            return;
        }

        target.textContent = "";
        let index = 0;

        const tick = () => {
            if (index >= text.length) {
                return;
            }
            target.textContent += text[index];
            index += 1;
            window.setTimeout(tick, 26);
        };

        tick();
    }

    function initGalleryLightbox() {
        const grid = document.querySelector("[data-gallery-grid]");
        const lightbox = document.querySelector("[data-lightbox]");

        if (!(grid instanceof HTMLElement) || !(lightbox instanceof HTMLElement)) {
            return;
        }

        const triggers = Array.from(grid.querySelectorAll("[data-lightbox-trigger]"));
        const image = lightbox.querySelector("[data-lightbox-image]");
        const caption = lightbox.querySelector("[data-lightbox-caption]");
        const prevButton = lightbox.querySelector("[data-lightbox-prev]");
        const nextButton = lightbox.querySelector("[data-lightbox-next]");
        const closeButtons = Array.from(lightbox.querySelectorAll("[data-lightbox-close]"));

        if (!(image instanceof HTMLImageElement) || !(caption instanceof HTMLElement) || !triggers.length) {
            return;
        }

        let index = 0;
        let lastFocused = null;

        const render = () => {
            const trigger = triggers[index];
            if (!(trigger instanceof HTMLElement)) {
                return;
            }
            const src = trigger.dataset.src || "";
            const alt = trigger.dataset.alt || "Galeriebild";
            const label = trigger.dataset.caption || alt;
            image.src = src;
            image.alt = alt;
            caption.textContent = label;
        };

        const open = (nextIndex) => {
            index = nextIndex;
            lastFocused = document.activeElement;
            render();
            lightbox.hidden = false;
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            const closeButton = lightbox.querySelector(".lightbox__close");
            if (closeButton instanceof HTMLElement) {
                closeButton.focus();
            }
        };

        const close = () => {
            lightbox.hidden = true;
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
            image.removeAttribute("src");
            if (lastFocused instanceof HTMLElement) {
                lastFocused.focus();
            }
        };

        const step = (direction) => {
            index = (index + direction + triggers.length) % triggers.length;
            render();
        };

        triggers.forEach((trigger, triggerIndex) => {
            trigger.addEventListener("click", () => open(triggerIndex));
        });

        if (prevButton instanceof HTMLButtonElement) {
            prevButton.addEventListener("click", () => step(-1));
        }

        if (nextButton instanceof HTMLButtonElement) {
            nextButton.addEventListener("click", () => step(1));
        }

        closeButtons.forEach((button) => button.addEventListener("click", close));

        document.addEventListener("keydown", (event) => {
            if (lightbox.hidden) {
                return;
            }

            if (event.key === "Tab") {
                const focusables = Array.from(
                    lightbox.querySelectorAll(
                        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
                    )
                ).filter((item) => item instanceof HTMLElement && !item.hasAttribute("disabled"));

                if (focusables.length > 0) {
                    const first = focusables[0];
                    const last = focusables[focusables.length - 1];
                    const active = document.activeElement;

                    if (event.shiftKey && active === first) {
                        event.preventDefault();
                        last.focus();
                    } else if (!event.shiftKey && active === last) {
                        event.preventDefault();
                        first.focus();
                    }
                }
            }

            if (event.key === "Escape") {
                close();
            } else if (event.key === "ArrowLeft") {
                step(-1);
            } else if (event.key === "ArrowRight") {
                step(1);
            }
        });
    }

    function initRandomFact() {
        const button = document.querySelector("[data-fact-btn]");
        const output = document.querySelector("[data-fact-output]");

        if (!(button instanceof HTMLButtonElement) || !(output instanceof HTMLElement)) {
            return;
        }

        const facts = [
            "Ich wohne in Roggwil BE. Ja, das ist nicht Hogwarts, aber fast.",
            "Seit 2024 in der Ausbildung zum Informatiker EFZ Applikationsentwicklung bei Bystronic.",
            "Wenn es Räder oder Griffe hat, bin ich dabei: Motorradfahren und Klettern.",
            "Ich mag Lösungen, die sauber sind und nicht fünf Workarounds brauchen.",
            "Tennis ist mein Reset-Button nach langen Coding-Sessions."
        ];

        let lastIndex = -1;

        button.addEventListener("click", () => {
            let nextIndex = Math.floor(Math.random() * facts.length);
            if (facts.length > 1 && nextIndex === lastIndex) {
                nextIndex = (nextIndex + 1) % facts.length;
            }
            lastIndex = nextIndex;
            output.textContent = facts[nextIndex];
        });
    }

    function initMoodSwitcher() {
        const root = document.documentElement;
        const buttons = Array.from(document.querySelectorAll("[data-mood-btn]"));
        const validMoods = new Set(["cyan", "lime", "sunset"]);

        if (!buttons.length) {
            return;
        }

        const readStoredMood = () => {
            try {
                return localStorage.getItem(ACCENT_KEY);
            } catch {
                return null;
            }
        };

        const storeMood = (mood) => {
            try {
                localStorage.setItem(ACCENT_KEY, mood);
            } catch {
                // Ignore write failures (private mode / blocked storage)
            }
        };

        const savedMood = readStoredMood();
        const defaultMood = validMoods.has(savedMood || "") ? savedMood : root.dataset.accent || "cyan";
        applyMood(defaultMood);

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const mood = button.getAttribute("data-mood");
                if (!mood || !validMoods.has(mood)) {
                    return;
                }
                applyMood(mood);
                storeMood(mood);
            });
        });

        function applyMood(mood) {
            root.dataset.accent = mood;
            buttons.forEach((button) => {
                const active = button.getAttribute("data-mood") === mood;
                button.setAttribute("aria-pressed", String(active));
            });
        }
    }

    function initQuiz() {
        const root = document.querySelector("[data-quiz-root]");
        if (!(root instanceof HTMLElement)) {
            return;
        }

        const questionEl = root.querySelector("[data-quiz-question]");
        const optionsEl = root.querySelector("[data-quiz-options]");
        const feedbackEl = root.querySelector("[data-quiz-feedback]");
        const nextBtn = root.querySelector("[data-quiz-next]");
        const restartBtn = root.querySelector("[data-quiz-restart]");
        const progressEl = root.querySelector("[data-quiz-progress]");

        if (
            !(questionEl instanceof HTMLElement) ||
            !(optionsEl instanceof HTMLElement) ||
            !(feedbackEl instanceof HTMLElement) ||
            !(nextBtn instanceof HTMLButtonElement) ||
            !(restartBtn instanceof HTMLButtonElement) ||
            !(progressEl instanceof HTMLElement)
        ) {
            return;
        }

        const questions = [
            {
                q: "Wann habe ich die Ausbildung als Informatiker EFZ gestartet?",
                choices: ["2021", "2024", "2026"],
                answer: "2024"
            },
            {
                q: "Welche Region nenne ich als Zuhause?",
                choices: ["Roggwil BE", "Genf Stadt", "Basel Zentrum"],
                answer: "Roggwil BE"
            },
            {
                q: "Was ist kein Hobby von mir laut Seite?",
                choices: ["Tennis", "Klettern", "Golf"],
                answer: "Golf"
            }
        ];

        let current = 0;
        let score = 0;
        let selected = "";

        const renderQuestion = () => {
            const item = questions[current];
            questionEl.textContent = item.q;
            progressEl.textContent = `Frage ${current + 1} von ${questions.length}`;
            optionsEl.innerHTML = "";
            feedbackEl.textContent = "";
            selected = "";
            nextBtn.disabled = true;

            item.choices.forEach((choice) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "quiz-option";
                button.textContent = choice;
                button.setAttribute("aria-pressed", "false");
                button.addEventListener("click", () => {
                    selected = choice;
                    Array.from(optionsEl.children).forEach((el) => {
                        if (el instanceof HTMLElement) {
                            el.setAttribute("aria-pressed", "false");
                        }
                    });
                    button.setAttribute("aria-pressed", "true");
                    nextBtn.disabled = false;
                });
                optionsEl.appendChild(button);
            });

            nextBtn.hidden = false;
            restartBtn.hidden = true;
        };

        nextBtn.addEventListener("click", () => {
            const item = questions[current];
            if (!selected) {
                return;
            }

            if (selected === item.answer) {
                score += 1;
                feedbackEl.textContent = "Sauber. Das war korrekt.";
            } else {
                feedbackEl.textContent = `Nope. Richtig wäre: ${item.answer}.`;
            }

            current += 1;

            window.setTimeout(() => {
                if (current < questions.length) {
                    renderQuestion();
                    return;
                }

                questionEl.textContent = "Resultat";
                optionsEl.innerHTML = "";
                progressEl.textContent = `Score: ${score}/${questions.length}`;

                if (score === questions.length) {
                    feedbackEl.textContent = "Volle Punktzahl. Du kennst den Vibe.";
                } else if (score >= 2) {
                    feedbackEl.textContent = "Stabil. Fast Insider-Level.";
                } else {
                    feedbackEl.textContent = "Noch Luft nach oben. Einfach weiter scrollen.";
                }

                nextBtn.hidden = true;
                restartBtn.hidden = false;
            }, 500);
        });

        restartBtn.addEventListener("click", () => {
            current = 0;
            score = 0;
            selected = "";
            renderQuestion();
        });

        renderQuestion();
    }

    function initKonamiConfetti() {
        const hint = document.querySelector("[data-konami-hint]");
        let position = 0;

        document.addEventListener("keydown", (event) => {
            const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
            const expected = KONAMI[position];

            if (key === expected) {
                position += 1;
                if (position === KONAMI.length) {
                    position = 0;
                    if (hint instanceof HTMLElement) {
                        hint.textContent = "Easter Egg aktiviert. Confetti incoming.";
                    }
                    launchConfetti();
                }
                return;
            }

            position = 0;
        });

        function launchConfetti() {
            if (reduceMotion) {
                return;
            }

            const root = document.createElement("div");
            root.setAttribute("aria-hidden", "true");
            root.style.position = "fixed";
            root.style.inset = "0";
            root.style.pointerEvents = "none";
            root.style.zIndex = "130";
            document.body.appendChild(root);

            const colors = ["var(--accent)", "var(--accent-2)", "#ffffff", "#7dffda"];

            for (let i = 0; i < 90; i += 1) {
                const piece = document.createElement("span");
                const left = Math.random() * window.innerWidth;
                const delay = Math.random() * 160;
                const duration = 1200 + Math.random() * 1200;
                const size = 5 + Math.random() * 7;

                piece.style.position = "absolute";
                piece.style.left = `${left}px`;
                piece.style.top = "-20px";
                piece.style.width = `${size}px`;
                piece.style.height = `${size * 1.6}px`;
                piece.style.borderRadius = "2px";
                piece.style.background = colors[i % colors.length];
                piece.style.opacity = "0.92";

                root.appendChild(piece);

                piece.animate(
                    [
                        { transform: `translate3d(0, 0, 0) rotate(0deg)` },
                        {
                            transform: `translate3d(${(Math.random() - 0.5) * 180}px, ${window.innerHeight + 80}px, 0) rotate(${Math.random() * 540}deg)`
                        }
                    ],
                    {
                        duration,
                        delay,
                        easing: "cubic-bezier(.2,.7,.22,1)",
                        fill: "forwards"
                    }
                );
            }

            window.setTimeout(() => {
                root.remove();
            }, 2600);
        }
    }

    function initParticles() {
        const canvas = document.querySelector("[data-particles-canvas]");
        if (!(canvas instanceof HTMLCanvasElement) || reduceMotion) {
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        let width = 0;
        let height = 0;
        let particles = [];
        let rafId = 0;
        let active = true;

        function resize() {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * ratio);
            canvas.height = Math.floor(height * ratio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

            const count = Math.min(56, Math.max(20, Math.floor(width / 30)));
            particles = new Array(count).fill(null).map(() => ({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 1.8 + 0.4,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3
            }));
        }

        function frame() {
            if (!active) {
                return;
            }

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(185, 220, 255, 0.46)";

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -8) p.x = width + 8;
                if (p.x > width + 8) p.x = -8;
                if (p.y < -8) p.y = height + 8;
                if (p.y > height + 8) p.y = -8;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            rafId = requestAnimationFrame(frame);
        }

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                active = false;
                cancelAnimationFrame(rafId);
            } else {
                active = true;
                frame();
            }
        });

        window.addEventListener("resize", resize);

        resize();
        frame();
    }

    function isHomePage() {
        return document.body?.dataset.page === "home";
    }

    function initHomeEntrance() {
        if (!isHomePage()) {
            return;
        }

        const body = document.body;
        const stagedItems = Array.from(document.querySelectorAll("[data-home-entrance-item]"));
        const header = document.querySelector("[data-home-entrance='header']");

        if (!(body instanceof HTMLBodyElement)) {
            return;
        }

        if (reduceMotion) {
            body.classList.add("home-entered");
            return;
        }

        body.classList.add("home-entering");

        if (header instanceof HTMLElement) {
            header.style.setProperty("--entrance-delay", "0ms");
        }

        stagedItems.forEach((item, index) => {
            if (item instanceof HTMLElement) {
                item.style.setProperty("--entrance-delay", `${80 + index * 76}ms`);
            }
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                body.classList.add("home-entered");
                body.classList.remove("home-entering");
            });
        });
    }

    function initScrollProgress() {
        if (!isHomePage()) {
            return;
        }

        const root = document.documentElement;
        let ticking = false;

        const update = () => {
            const maxScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const progress = Math.max(0, Math.min(1, window.scrollY / maxScrollable));
            root.style.setProperty("--scroll-progress", progress.toFixed(4));
            ticking = false;
        };

        const requestUpdate = () => {
            if (ticking) {
                return;
            }
            ticking = true;
            requestAnimationFrame(update);
        };

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate, { passive: true });
        update();
    }

    function initHeaderScrollState() {
        if (!isHomePage()) {
            return;
        }

        const header = document.querySelector(".site-header");
        if (!(header instanceof HTMLElement)) {
            return;
        }

        let ticking = false;

        const syncHeaderState = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 24);
            ticking = false;
        };

        const requestSync = () => {
            if (ticking) {
                return;
            }
            ticking = true;
            requestAnimationFrame(syncHeaderState);
        };

        window.addEventListener("scroll", requestSync, { passive: true });
        window.addEventListener("resize", requestSync, { passive: true });
        syncHeaderState();
    }

    function setFooterYear() {
        const yearSlots = document.querySelectorAll("[data-year]");
        const year = new Date().getFullYear();
        yearSlots.forEach((slot) => {
            slot.textContent = String(year);
        });
    }
})();
