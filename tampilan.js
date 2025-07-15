const angkaTampil = document.getElementById("angkaTampil");
angkaTampil.textContent = localStorage.getItem("antrianTerakhir") || "-";

window.addEventListener("storage", (e) => {
  if (e.key === "antrianTerakhir") {
    angkaTampil.textContent = e.newValue;

    // 🔁 Reset animasi scaleIn agar terasa setiap kali angka berubah
    angkaTampil.style.animation = "none";
    angkaTampil.offsetHeight; // force reflow
    angkaTampil.style.animation = null;
  }
});
