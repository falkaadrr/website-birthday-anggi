function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  const nav = document.getElementById("navbar");

  // 1. Sembunyikan semua halaman
  pages.forEach((page) => {
    page.classList.remove("active", "fade-in");
  });

  // 2. Tampilkan halaman target
  const targetPage = document.getElementById(pageId);
  targetPage.classList.add("active");

  // 3. Tambahkan class animasi fade-in
  targetPage.classList.add("fade-in");

  // 4. Logika Navbar
  if (pageId === "profilePage") {
    nav.classList.remove("active");
  } else {
    nav.classList.add("active");
    // Putar musik (harus interaksi user dulu, klik profil sudah termasuk interaksi)
    document
      .getElementById("bdaySong")
      .play()
      .catch(() => console.log("Autoplay musik dicegah browser"));
  }

  window.scrollTo(0, 0);
}

// Efek Navbar Hitam saat Scroll
window.addEventListener("scroll", function () {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("black");
  } else {
    nav.classList.remove("black");
  }
});

// Video Hero Logic
function playHeroVideo() {
  const overlay = document.getElementById("heroVideoOverlay");
  const video = document.getElementById("fullVideo");

  overlay.classList.add("active"); // 🔥 fade in

  setTimeout(() => {
    video.currentTime = 0;
    video.play();
  }, 200); // biar muncul dulu baru play

  const music = document.getElementById("bdaySong");
  if (music) music.pause();
}

function closeHeroVideo() {
  const overlay = document.getElementById("heroVideoOverlay");
  const video = document.getElementById("fullVideo");

  overlay.classList.remove("active"); // 🔥 fade out

  setTimeout(() => {
    video.pause();
    video.currentTime = 0;
  }, 500); // sesuai durasi transition
}

function openPasswordModal() {
  const modal = document.getElementById("passwordModal");
  const bg = document.querySelector(".profile-container");

  modal.classList.add("active"); // fade in
  bg.classList.add("blur"); // background efek

  document.getElementById("passInput").focus();
}

function closePasswordModal() {
  const modal = document.getElementById("passwordModal");
  const bg = document.querySelector(".profile-container");

  modal.classList.remove("active"); // fade out
  bg.classList.remove("blur");

  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("passInput").value = "";
}

function playOpeningSequence() {
  const introContainer = document.getElementById("introContainer");
  const introVideo = document.getElementById("netflixIntro");
  const tudumSound = document.getElementById("tudumSound");

  // Tampilkan container intro
  introContainer.style.display = "flex";

  // Putar Suara Tudum
  tudumSound.play();

  // Putar Video Intro
  introVideo.play();

  // Saat video hampir selesai atau selesai (misal video durasi 4 detik)
  introVideo.onended = function () {
    // Berikan efek Fade Out
    introContainer.classList.add("fade-out-intro");

    // Setelah animasi fade out selesai (1.5 detik), tampilkan halaman utama
    setTimeout(() => {
      introContainer.style.display = "none";
      showPage("mainPage"); // Pindah ke beranda
    }, 1500);
  };
}

// Support tombol Enter
document.getElementById("passInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkPassword();
  }
});

function checkPassword() {
  const input = document.getElementById("passInput").value.toLowerCase().trim();
  const correctPass = "hitam";

  if (input === correctPass) {
    closePasswordModal();
    playOpeningSequence(); // 🔥 WAJIB INI
  } else {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("passInput").value = "";
  }
}

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    // kalau udah ada yang aktif → reset dulu
    document.querySelectorAll(".card.active").forEach((c) => {
      c.classList.remove("active");
    });

    card.classList.add("active");
    document.body.classList.add("modal-active");
  });
});

document.addEventListener("click", function (e) {
  const activeCard = document.querySelector(".card.active");

  if (activeCard && !activeCard.contains(e.target)) {
    activeCard.classList.remove("active");
    document.body.classList.remove("modal-active");
  }
});

const wishItems = document.querySelectorAll(".wish-item");

wishItems.forEach((item) => {
  item.addEventListener("click", () => {
    // reset
    document.querySelectorAll(".wish-item.active").forEach((el) => {
      el.classList.remove("active");
    });

    item.classList.add("active");
    document.body.classList.add("wishlist-active");
  });
});

// klik luar = close
document.addEventListener("click", function (e) {
  const active = document.querySelector(".wish-item.active");

  if (active && !active.contains(e.target)) {
    active.classList.remove("active");
    document.body.classList.remove("wishlist-active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("videoPlayerOverlay");
  const mainVideo = document.getElementById("mainVideo");

  // hover preview
  document.querySelectorAll(".video-item video").forEach((video) => {
    video.addEventListener("mouseenter", () => video.play());
    video.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  // klik → buka video utama
  document.querySelectorAll(".video-item video").forEach((video) => {
    video.addEventListener("click", (e) => {
      e.stopPropagation();

      // pause semua video kecil
      document.querySelectorAll(".video-item video").forEach((v) => {
        v.pause();
        v.currentTime = 0;
      });

      mainVideo.src = video.src;
      overlay.classList.add("active");

      mainVideo.currentTime = 0;
      mainVideo.play();
    });
  });

  // klik luar = close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      mainVideo.pause();
      mainVideo.currentTime = 0;
      overlay.classList.remove("active");
    }
  });

  // ESC = close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      mainVideo.pause();
      overlay.classList.remove("active");
    }
  });
});
