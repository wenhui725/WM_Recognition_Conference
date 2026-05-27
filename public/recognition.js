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

    const amount = track.clientWidth * 0.72;

    track.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  if (prev) {
    prev.addEventListener("click", () => scrollCarousel(-1));
  }

  if (next) {
    next.addEventListener("click", () => scrollCarousel(1));
  }
}
  const dialog = document.getElementById("media-dialog");
const title = document.getElementById("dialog-title");
const close = document.getElementById("dialog-close");
let previousFocus = null;

if (dialog && title && close) {
  const dismiss = () => {
    dialog.classList.remove("is-open");
    dialog.setAttribute("aria-hidden", "true");
    dialog.inert = true;
    document.body.classList.remove("modal-open");

    if (previousFocus) previousFocus.focus();
  };

  document.querySelectorAll("[data-video]").forEach((button) => {
    button.addEventListener("click", () => {
      previousFocus = button;
      title.textContent = button.dataset.video;

      dialog.classList.add("is-open");
      dialog.setAttribute("aria-hidden", "false");
      dialog.inert = false;
      document.body.classList.add("modal-open");

      close.focus();
    });
  });

  close.addEventListener("click", dismiss);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dismiss();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.classList.contains("is-open")) {
      dismiss();
    }
  });
}

  const nav = document.querySelector(".nav-scroll");
  const links = document.querySelectorAll(".nav-scroll a");
  const observedSections = [...links]
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);

  const marker = new IntersectionObserver((entries) => {
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
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  });

    observedSections.forEach((section) => {
    marker.observe(section);
  });

  const revealItems = document.querySelectorAll(".reveal, .reveal-list");

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