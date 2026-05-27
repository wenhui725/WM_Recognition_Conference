/* Meaningful UI: gallery filtering, video preview modal, active section navigation. */
(() => {
  const filters = document.querySelectorAll(".filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      filters.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });

      galleryItems.forEach((item) => {
        item.hidden = category !== "all" && item.dataset.category !== category;
      });
    });
  });

  const spiritCarousel = document.querySelector("[data-spirit-carousel]");

  if (spiritCarousel) {
    const track = spiritCarousel.querySelector(".spirit-carousel-track");
    const prev = spiritCarousel.querySelector(".is-prev");
    const next = spiritCarousel.querySelector(".is-next");

    const scrollCarousel = (direction) => {
      if (!track) return;

      track.scrollBy({
        left: direction * track.clientWidth * 0.72,
        behavior: "smooth",
      });
    };

    prev?.addEventListener("click", () => scrollCarousel(-1));
    next?.addEventListener("click", () => scrollCarousel(1));
  }

  const nav = document.querySelector(".nav-scroll");
  const links = document.querySelectorAll(".nav-scroll a");

  const observedSections = [...links]
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);

  const marker = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeLink = [...links].find(
          (link) => link.hash === `#${entry.target.id}`
        );

        links.forEach((link) => {
          link.setAttribute("aria-current", String(link === activeLink));
        });

        if (activeLink && nav && window.matchMedia("(max-width: 760px)").matches) {
          activeLink.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  observedSections.forEach((section) => {
    marker.observe(section);
  });

  const revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }
})();