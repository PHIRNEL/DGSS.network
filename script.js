document.addEventListener("DOMContentLoaded", () => {
  // =================
  // Diaporama
  // =================
  const slides = document.querySelectorAll(".dgss-slider .slide");
  const prevBtn = document.querySelector(".dgss-slider .prev");
  const nextBtn = document.querySelector(".dgss-slider .next");
  const slider = document.querySelector(".dgss-slider");
  let currentIndex = 0;
  const intervalTime = 9000;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    const activeImg = slides[index].querySelector("img");
    if (activeImg.complete) {
      updateSliderHeight(activeImg);
    } else {
      activeImg.onload = () => updateSliderHeight(activeImg);
    }
  }

  function updateSliderHeight(img) {
    if (!img) return;
    const sliderWidth = slider.clientWidth;
    const maxHeight = 600; // hauteur max du slider
    let height = (img.naturalHeight / img.naturalWidth) * sliderWidth;
    if (height > maxHeight) height = maxHeight;
    slider.style.height = height + "px";
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function stopSlider() {
    clearInterval(slideInterval);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      stopSlider();
      nextSlide();
      startSlider();
    });
    prevBtn.addEventListener("click", () => {
      stopSlider();
      prevSlide();
      startSlider();
    });
  }

  showSlide(currentIndex);
  startSlider();

  // =================
  // Documents
  // =================
  const documents = [
    { titre: "Décret n° 2012-24 du 2 Février 2012", categorie: "Portant Attribution et Organisation de la DGSS", lien: "Documents/Decret_2012-24.pdf" },
    { titre: "Circulaire Santé", categorie: "Circulaire", lien: "docs/circulaire_sante.pdf" },
    { titre: "Statistiques Sociales", categorie: "Statistiques", lien: "docs/stats.pdf" }
  ];

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function renderDocuments(filter = '') {
    const tableBody = document.getElementById('documentList');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    const cleanFilter = removeAccents(filter.toLowerCase());
    const filteredDocs = documents.filter(doc => {
      const titre = removeAccents(doc.titre.toLowerCase());
      const categorie = removeAccents(doc.categorie.toLowerCase());
      return titre.includes(cleanFilter) || categorie.includes(cleanFilter);
    });

    if (filteredDocs.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="3" style="text-align:center;color:#888;">Aucun document trouvé.</td>`;
      tableBody.appendChild(row);
      return;
    }

    filteredDocs.forEach(doc => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${doc.titre}</td><td>${doc.categorie}</td><td><a href="${doc.lien}" target="_blank">Lire</a></td>`;
      tableBody.appendChild(row);
    });
  }

  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", (e) => renderDocuments(e.target.value));
  }
  renderDocuments();

  // =================
  // Footer année
  // =================
  const footerText = document.querySelector(".footer-bottom p:first-child");
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.innerHTML = `© ${year} Ministère de la Fonction Publique, du Travail et de la Sécurité Sociale. Tous droits réservés.`;
  }
});
