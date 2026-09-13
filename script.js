/* ==========================================================================
   Portfolio - script.js
   --------------------------------------------------------------------------
   Table of contents:
   1. Project data  <- add / edit projects here
   2. Theme toggle (light/dark + localStorage)
   3. Navbar: shadow on scroll & mobile menu (hamburger)
   4. Scroll effects: scroll-spy, progress bar, background parallax
   5. Project cards + detail modal
   6. Scroll reveal animations
   7. Typing animation (name in the Home section)
   ========================================================================== */

'use strict';

/* ==========================================================================
   1. PROJECT DATA
   - image       : image path (replace the placeholders in assets/images/)
   - tags        : technologies used
   - description : array of paragraphs. Long text automatically becomes
                   scrollable inside the modal.
   REPLACE: these are sample projects, swap in your own.
   ========================================================================== */
const PROJECTS = [
    {
        title: 'Small Business Point of Sale App',
        image: './assets/images/PassingLab.png',
        tags: ['Next.js', 'Supabase'],
        description: [
            'A web-based cashier app that helps small business owners record sales quickly, without needing expensive point-of-sale hardware.',
            'Key features include product and stock management, a shopping cart, receipt printing, and exportable daily and monthly sales reports.',
            'The biggest challenge in this project was keeping the checkout flow simple for users who are not used to digital apps.',
        ],
    },
    {
        title: 'Binus Marketplace',
        image: './assets/images/Binus Marketplace.png',
        tags: ['Nest.js', 'React Native'],
        description: [
            'An online attendance system for schools or small offices that replaces paper-based attendance. Users can check in and check out from a browser on any device.',
            'Admins get a dashboard to monitor attendance in real time, see who is late, on leave, or absent, and manage user data with ease.',
            'Every attendance record is timestamped, so monthly attendance reports can be generated automatically and downloaded for administration or payroll.',
            'On the security side, the system uses session-based authentication, server-side input validation, and separate access rights for admins and regular users.',
            'The interface is fully responsive so it is comfortable to use on smartphones, since most users check in from their phones.',
            'Planned improvements include location-based attendance (geofencing) and automatic reminder notifications before the start of the workday.',
        ],
    },
    {
        title: 'Daily Task Manager',
        image: './assets/images/project-3.svg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description: [
            'A simple to-do list app for organizing daily tasks. Tasks can be added, marked as done, edited, and deleted.',
            'Data is saved in localStorage, so the task list survives closing the browser without needing a server or database.',
        ],
    },
    {
        title: 'Office Network Simulation',
        image: './assets/images/project-4.svg',
        tags: ['Cisco Packet Tracer', 'Networking'],
        description: [
            'Design and simulation of a small office network topology using Cisco Packet Tracer.',
            'Covers router and switch configuration, VLANs to separate departments, a DHCP server, and connectivity testing between devices with ping and traceroute.',
        ],
    },
    {
        title: 'Schedule Reminder Bot',
        image: './assets/images/project-5.svg',
        tags: ['Python', 'Automation'],
        description: [
            'A simple Python bot that automatically sends reminders for class schedules and assignment deadlines.',
            'Schedules are read from a configuration file, so they can be updated without touching the code.',
        ],
    },
    {
        title: 'Personal Portfolio Website',
        image: './assets/images/project-6.svg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description: [
            'The responsive portfolio website you are looking at right now, built with HTML, CSS, and JavaScript without any framework.',
            'It features a light/dark theme saved in localStorage, an animated background, scroll-spy navigation, scroll animations, and an accessible project detail modal.',
        ],
    },
];


/* ==========================================================================
   2. THEME TOGGLE
   The initial theme is already applied by the inline script in <head>
   (prevents a flash). Here we handle the button and save the user's choice.
   ========================================================================== */
const THEME_KEY = 'portfolio-theme';           // must match the script in <head>
const THEME_COLORS = { light: '#f6f7fb', dark: '#092328' }; // for <meta name="theme-color">

const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getSavedTheme() {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch {
        return null;
    }
}

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme]);
}

applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);

    // Replay the spin + ripple animation on every press (removing the class and
    // forcing a reflow restarts it even when the button is clicked rapidly)
    themeToggle.classList.remove('is-switching');
    void themeToggle.offsetWidth;
    themeToggle.classList.add('is-switching');

    try {
        localStorage.setItem(THEME_KEY, next);
    } catch {
        /* localStorage unavailable: the theme still switches, it just isn't saved */
    }
});

themeToggle.addEventListener('animationend', (event) => {
    if (event.animationName === 'theme-spin') themeToggle.classList.remove('is-switching');
});

// Follow OS theme changes as long as the user hasn't picked a theme manually
darkSchemeQuery.addEventListener('change', (event) => {
    if (!getSavedTheme()) applyTheme(event.matches ? 'dark' : 'light');
});


/* ==========================================================================
   3. NAVBAR & MOBILE MENU
   ========================================================================== */
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = Array.from(document.querySelectorAll('.nav__link'));
const mobileQuery = window.matchMedia('(max-width: 767.98px)');

function setMenuOpen(open) {
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navToggle.querySelector('i').className = open ? 'ri-close-line' : 'ri-menu-line';
}

navToggle.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('is-open'));
});

// Close the menu when clicking outside the header
document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('is-open') && !header.contains(event.target)) {
        setMenuOpen(false);
    }
});

// Close the menu with the Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenuOpen(false);
        navToggle.focus();
    }
});

// Reset the menu when the screen grows to tablet/desktop size
mobileQuery.addEventListener('change', (event) => {
    if (!event.matches) setMenuOpen(false);
});


/* ==========================================================================
   4. SCROLL EFFECTS
   Scroll-spy: the active section is the last one whose top has passed the
   "reading line" (just below the navbar + 30% of the viewport). At the very
   bottom of the page, the last section (Contact) is always active.
   ========================================================================== */
const sections = navLinks
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);
const bgLayer = document.getElementById('bg-animated');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* --------------------------------------------------------------------------
   Shooting stars: fills #bg-meteors with streaks that fall diagonally across
   the background. Each one gets its own start point, length, speed, delay and
   color so the field never looks like a repeating pattern. Skipped entirely
   when the visitor prefers reduced motion, and rebuilt (debounced) on resize
   so the count matches the screen size.
   -------------------------------------------------------------------------- */
const meteorLayer = document.getElementById('bg-meteors');
const METEOR_COLORS = ['var(--neon-1)', 'var(--neon-2)', 'var(--neon-3)'];

const random = (min, max) => min + Math.random() * (max - min);

function buildMeteors() {
    if (!meteorLayer || prefersReducedMotion) return;

    // Roughly one streak per 90px of width, kept within sane bounds
    const count = Math.round(Math.min(Math.max(window.innerWidth / 90, 12), 40));
    const meteors = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const meteor = document.createElement('span');
        meteor.className = 'meteor';
        // Start above/right of the viewport so they fly in from off-screen
        meteor.style.setProperty('--x', `${random(-10, 110).toFixed(1)}%`);
        meteor.style.setProperty('--y', `${random(-30, 70).toFixed(1)}%`);
        meteor.style.setProperty('--angle', `${random(125, 145).toFixed(1)}deg`);
        meteor.style.setProperty('--len', `${Math.round(random(70, 220))}px`);
        meteor.style.setProperty('--thickness', `${random(1, 2.4).toFixed(1)}px`);
        meteor.style.setProperty('--travel', `${Math.round(random(70, 120))}vmax`);
        meteor.style.setProperty('--dur', `${random(3.5, 9).toFixed(2)}s`);
        meteor.style.setProperty('--delay', `-${random(0, 9).toFixed(2)}s`); // negative: the field is already in motion on load
        meteor.style.setProperty('--color', METEOR_COLORS[i % METEOR_COLORS.length]);
        meteors.appendChild(meteor);
    }

    meteorLayer.replaceChildren(meteors);
}

buildMeteors();

let meteorResizeTimer = null;
window.addEventListener('resize', () => {
    clearTimeout(meteorResizeTimer);
    meteorResizeTimer = setTimeout(buildMeteors, 300);
});

// When a menu link is clicked, the target section is "locked" until the smooth
// scroll finishes, so the underline doesn't flicker through the sections in between.
let lockedSectionId = null;
let lockTimer = null;

function setActiveLink(id) {
    navLinks.forEach((link) => {
        const isActive = link.hash === `#${id}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
}

function getCurrentSectionId() {
    const scrollBottom = window.scrollY + window.innerHeight;
    if (scrollBottom >= document.documentElement.scrollHeight - 2) {
        return sections[sections.length - 1].id;
    }

    const readingLine = header.offsetHeight + window.innerHeight * 0.3;
    let currentId = sections[0].id;
    for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) currentId = section.id;
    }
    return currentId;
}

// Release the lock once scrolling has stopped for `delay` ms
function releaseLockAfter(delay) {
    clearTimeout(lockTimer);
    lockTimer = setTimeout(() => {
        lockedSectionId = null;
    }, delay);
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        lockedSectionId = link.hash.slice(1);
        setActiveLink(lockedSectionId);
        releaseLockAfter(1000); // fallback in case the page doesn't need to scroll at all
        if (mobileQuery.matches) setMenuOpen(false);
    });
});

function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

    header.classList.toggle('is-scrolled', window.scrollY > 8);
    header.style.setProperty('--progress', progress.toFixed(4)); // scroll progress bar

    // Background parallax: the color blobs drift up slowly as you scroll
    if (!prefersReducedMotion) {
        bgLayer.style.transform = `translate3d(0, ${(-progress * 120).toFixed(1)}px, 0)`;
    }

    if (lockedSectionId) {
        releaseLockAfter(150); // still scrolling -> keep the lock
    } else {
        setActiveLink(getCurrentSectionId());
    }
}

// Throttle with requestAnimationFrame to keep scrolling smooth
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        onScroll();
        scrollTicking = false;
    });
}, { passive: true });

window.addEventListener('resize', onScroll);
window.addEventListener('load', onScroll);
onScroll();


/* ==========================================================================
   5. PROJECT CARDS & MODAL
   ========================================================================== */
const projectsGrid = document.getElementById('projects-grid');
const cardTemplate = document.getElementById('project-card-template');
const modal = document.getElementById('project-modal');
const modalImg = modal.querySelector('.modal__img');
const modalTitle = modal.querySelector('.modal__title');
const modalTags = modal.querySelector('.modal__tags');
const modalDesc = modal.querySelector('.modal__desc');
const modalClose = modal.querySelector('.modal__close');

function renderTags(listEl, tags) {
    listEl.replaceChildren(
        ...tags.map((tag) => {
            const li = document.createElement('li');
            li.className = 'tag';
            li.textContent = tag;
            return li;
        })
    );
}

function openProjectModal(project) {
    modalImg.src = project.image;
    modalImg.alt = `Screenshot of the ${project.title} project`;
    modalTitle.textContent = project.title;
    renderTags(modalTags, project.tags);
    modalDesc.replaceChildren(
        ...project.description.map((text) => {
            const p = document.createElement('p');
            p.textContent = text;
            return p;
        })
    );
    modalDesc.scrollTop = 0;

    // Focus moves to the close button automatically. Page scrolling is locked
    // via CSS (body:has(.modal[open])), so no extra class is needed here.
    modal.showModal();
}

// Render every card from the PROJECTS array
const fragment = document.createDocumentFragment();
PROJECTS.forEach((project, index) => {
    const item = cardTemplate.content.firstElementChild.cloneNode(true);
    const img = item.querySelector('.project-card__img');
    const button = item.querySelector('.project-card__btn');

    img.src = project.image;
    img.alt = `Screenshot of the ${project.title} project`;
    item.querySelector('.project-card__title').textContent = project.title;
    renderTags(item.querySelector('.tags'), project.tags);

    button.setAttribute('aria-label', `View details of the ${project.title} project`);
    button.addEventListener('click', () => openProjectModal(project));

    item.style.setProperty('--delay', `${(index % 3) * 0.12}s`); // cards in a row appear one by one
    fragment.appendChild(item);
});
projectsGrid.appendChild(fragment);

// Close the modal: close button, backdrop click, or Esc (built into <dialog>)
modalClose.addEventListener('click', () => modal.close());

modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close(); // click landed on the backdrop
});


/* ==========================================================================
   6. SCROLL REVEAL ANIMATIONS
   - [data-reveal="type"] elements animate in when they enter the viewport.
   - Children of [data-stagger] get increasing delays so they appear one by one.
   - When an element drops completely below the viewport (scrolling up), it
     resets, so the animation plays again the next time you scroll down to it.
   - Showing and resetting use two separate observers with different edges,
     so an element near the bottom of the screen can't flicker between states.
   ========================================================================== */
document.querySelectorAll('[data-stagger]').forEach((list) => {
    list.querySelectorAll(':scope > [data-reveal]').forEach((el, i) => {
        el.style.setProperty('--delay', `${i * 0.08}s`);
    });
});

const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const showObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    // Reset only once the element is fully off-screen below, so the "hide" transition
    // is never seen. Elements scrolled past (above the viewport) stay visible.
    const resetObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0 });

    revealEls.forEach((el) => {
        showObserver.observe(el);
        resetObserver.observe(el);
    });
} else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
}


/* ==========================================================================
   7. TYPING ANIMATION
   Types the text of [data-typing] letter by letter, pauses, deletes it,
   and repeats forever. With reduced motion the full text is shown instead.
   ========================================================================== */
const TYPE_SPEED = 110;      // ms per letter while typing
const DELETE_SPEED = 45;     // ms per letter while deleting
const HOLD_FULL = 2200;      // pause once the whole name is shown
const HOLD_EMPTY = 500;      // pause before typing again

const typingEl = document.querySelector('[data-typing]');

if (typingEl) {
    const fullText = typingEl.dataset.typing;

    if (prefersReducedMotion) {
        typingEl.textContent = fullText;
    } else {
        let length = 0;
        let deleting = false;

        const tick = () => {
            length += deleting ? -1 : 1;
            typingEl.textContent = fullText.slice(0, length);

            let delay = deleting ? DELETE_SPEED : TYPE_SPEED;
            if (!deleting && length === fullText.length) {
                deleting = true;
                delay = HOLD_FULL;
            } else if (deleting && length === 0) {
                deleting = false;
                delay = HOLD_EMPTY;
            }

            // Caret blinks only during the pauses
            typingEl.classList.toggle('is-typing', delay < HOLD_EMPTY);
            setTimeout(tick, delay);
        };

        setTimeout(tick, 700); // start once the heading's reveal animation is underway
    }
}
