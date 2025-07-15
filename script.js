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
      speechSynthesis.cancel();

      const suara1 = new SpeechSynthesisUtterance("Antrian nomor");
      suara1.lang = "id-ID";
      suara1.onend = () => {
        const suara2 = new SpeechSynthesisUtterance(angka.toString());
        suara2.lang = "id-ID";
        speechSynthesis.speak(suara2);
      };
      speechSynthesis.speak(suara1);

      semuaTombol.forEach(btn => btn.classList.remove("aktif"));
      tombolAktif.classList.add("aktif");
      tombolAktif.focus();
      indexAktif = semuaTombol.indexOf(tombolAktif);

      // Kirim ke tampilan (monitor 2)
      localStorage.setItem("antrianTerakhir", angka);
    }

    document.addEventListener("keydown", (e) => {
      if (indexAktif === -1) return;
      let targetIndex = indexAktif;

      if (e.key === "ArrowLeft" && indexAktif > 0) targetIndex--;
      else if (e.key === "ArrowRight" && indexAktif < semuaTombol.length - 1) targetIndex++;
      else if (e.key === "ArrowUp" && indexAktif - kolom >= 0) targetIndex -= kolom;
      else if (e.key === "ArrowDown" && indexAktif + kolom < semuaTombol.length) targetIndex += kolom;

      if (targetIndex !== indexAktif) {
        semuaTombol[targetIndex].click();
      }
    });