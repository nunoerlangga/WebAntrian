const angkaContainer = document.getElementById("angkaContainer");
const semuaTombol = [];
const kolom = 10; // jumlah kolom grid

// Buat tombol angka 0–99
for (let i = 1; i <= 1000; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.setAttribute("data-angka", i);
  btn.onclick = () => panggilTTS(i, btn);
  angkaContainer.appendChild(btn);
  semuaTombol.push(btn);
}

let indexAktif = -1; // posisi tombol aktif terakhir

function panggilTTS(angka, tombolAktif) {
  // Batalkan suara sebelumnya
  speechSynthesis.cancel();

  // TTS: "Antrian nomor"
  const suara1 = new SpeechSynthesisUtterance("Antrian nomor");
  suara1.lang = "id-ID";

  suara1.onend = () => {
    const suara2 = new SpeechSynthesisUtterance(angka.toString());
    suara2.lang = "id-ID";
    speechSynthesis.speak(suara2);
  };

  speechSynthesis.speak(suara1);

  // Highlight tombol aktif
  semuaTombol.forEach((btn) => btn.classList.remove("aktif"));
  tombolAktif.classList.add("aktif");
  tombolAktif.focus();

  indexAktif = semuaTombol.indexOf(tombolAktif);
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (indexAktif === -1) return; // belum ada tombol yang diklik

  let targetIndex = indexAktif;

  if (e.key === "ArrowLeft" && indexAktif > 0) {
    targetIndex = indexAktif - 1;
  } else if (e.key === "ArrowRight" && indexAktif < semuaTombol.length - 1) {
    targetIndex = indexAktif + 1;
  } else if (e.key === "ArrowUp" && indexAktif - kolom >= 0) {
    targetIndex = indexAktif - kolom;
  } else if (e.key === "ArrowDown" && indexAktif + kolom < semuaTombol.length) {
    targetIndex = indexAktif + kolom;
  }

  if (targetIndex !== indexAktif) {
    semuaTombol[targetIndex].click(); // panggil ulang TTS dan highlight
  }
});
