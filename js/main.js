document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  if (!gallery) return; // exit if not on portfolio page

  // Auto-generate 41 images named design1.jpg to design41.jpg
  for (let i = 1; i <= 41; i++) {
    const imgName = `design${i}.jpg`;
    const a = document.createElement("a");
    a.href = `portfolio/images/${imgName}`;
    a.setAttribute("data-lightbox", "portfolio");

    const img = document.createElement("img");
    img.src = `portfolio/images/${imgName}`;
    img.alt = `Design ${i}`;

    a.appendChild(img);
    gallery.appendChild(a);
  }
});
