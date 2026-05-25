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

  const dialog = document.getElementById("media-dialog");
  const title = document.getElementById("dialog-title");
  const close = document.getElementById("dialog-close");
  let previousFocus = null;

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

  const links = document.querySelectorAll(".nav-scroll a");
  const observedSections = [...links].map((link) => document.querySelector(link.hash));

  const marker = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      links.forEach((link) => {
        link.setAttribute(
          "aria-current",
          String(link.hash === "#" + entry.target.id)
        );
      });
    });
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  });

  observedSections.forEach((section) => {
    if (section) marker.observe(section);
  });
})();