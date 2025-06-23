document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  if (gallery) {
    for (let i = 1; i <= 43; i++) {
      const imgName = `design${i}.webp`;
      const a = document.createElement("a");
      a.href = `portfolio/images/${imgName}`;
      a.setAttribute("data-lightbox", "portfolio");

      const img = document.createElement("img");
      img.src = `portfolio/images/${imgName}`;
      img.alt = `Design ${i}`;
      img.loading = "lazy";

      a.appendChild(img);
      gallery.appendChild(a);
    }
  }

  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
});
