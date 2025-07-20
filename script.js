const angkaContainer = document.getElementById("angkaContainer");
const semuaTombol = [];
const kolom = 5;
let indexAktif = -1;

for (let i = 1; i <= 1000; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.setAttribute("data-angka", i);
  btn.onclick = () => panggilTTS(i, btn);
  angkaContainer.appendChild(btn);
  semuaTombol.push(btn);
}

function panggilTTS(angka, tombolAktif) {
  speechSynthesis.cancel(); // pastikan tidak menumpuk

  const bel = document.getElementById("bel");
  bel.currentTime = 0; // restart dari awal

  bel
    .play()
    .then(() => {
      // Setelah bel selesai, baru bicara
      bel.onended = () => {
        const suara1 = new SpeechSynthesisUtterance("Antrian SKCK Nomor");
        suara1.lang = "id-ID";
        suara1.rate = 0.9; // sedikit lebih lambat dari default
        suara1.pitch = 1.0;

        suara1.onend = () => {
          const suara2 = new SpeechSynthesisUtterance(angka.toString());
          suara2.lang = "id-ID";
          suara2.rate = 0.9;
          suara2.pitch = 1.0;
          speechSynthesis.speak(suara2);

          suara2.onend = () => {
          const suara3 = new SpeechSynthesisUtterance("Silahkan Menuju Ke Loket Pendaftaran")
          suara3.lang = "id-ID";
          suara3.rate = 0.9;
          suara3.pitch = 1.0;
          speechSynthesis.speak(suara3);
        }
        };

        

        speechSynthesis.speak(suara1);
      };
    })
    .catch((err) => {
      console.error("Gagal memutar bel:", err);

      // Jika bel gagal, tetap jalankan TTS
      const suara1 = new SpeechSynthesisUtterance("Antrian SKCK Nomor");
      suara1.lang = "id-ID";
      suara1.rate = 1.0;
      suara1.pitch = 1.0;

      suara1.onend = () => {
        const suara2 = new SpeechSynthesisUtterance(angka.toString());
        suara2.lang = "id-ID";
        suara2.rate = 1.0;
        suara2.pitch = 1.0;
        speechSynthesis.speak(suara2);
      };

      speechSynthesis.speak(suara1);
    });

  // Update tampilan
  semuaTombol.forEach((btn) => btn.classList.remove("aktif"));
  tombolAktif.classList.add("aktif");
  tombolAktif.focus();
  indexAktif = semuaTombol.indexOf(tombolAktif);

  // Kirim ke monitor antrian
  localStorage.setItem("antrianTerakhir", angka);
}

document.addEventListener("keydown", (e) => {
  if (indexAktif === -1) return;
  let targetIndex = indexAktif;

  if (e.key === "ArrowLeft" && indexAktif > 0) targetIndex--;
  else if (e.key === "ArrowRight" && indexAktif < semuaTombol.length - 1)
    targetIndex++;
  else if (e.key === "ArrowUp" && indexAktif - kolom >= 0) targetIndex -= kolom;
  else if (e.key === "ArrowDown" && indexAktif + kolom < semuaTombol.length)
    targetIndex += kolom;

  if (targetIndex !== indexAktif) {
    semuaTombol[targetIndex].click();
  }
});
