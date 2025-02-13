document.addEventListener("DOMContentLoaded", function () {
    const starContainer = document.querySelector(".stars-background");
    const numStars = 650;
    const music = document.getElementById("background-music");
    const musicButton = document.getElementById("music-button");
    const musicIcon = document.getElementById("music-icon");

    function toggleMusic() {
        if (music.paused) {
            music.play();
            musicIcon.innerHTML = "";
        } else {
            music.pause();
            musicIcon.innerHTML = "";
        }
    }
    function startMusicOnClick() {
        music.play().then(() => {
            console.log("Music autoplay started.");
        }).catch((error) => {
            console.log("Autoplay blocked. Waiting for user interaction.");
        });
        document.removeEventListener("click", startMusicOnClick);
    }

    document.addEventListener("click", startMusicOnClick, { once: true });

    window.toggleMusic = toggleMusic;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        const sizeClass = ["small", "medium", "large"][Math.floor(Math.random() * 3)];
        star.classList.add(sizeClass);

        star.style.top = `${Math.random() * 350}vh`; 
        star.style.left = `${Math.random() * 100}vw`;

        star.dataset.speed = Math.random() * 0.3 + 0.1; // 0.1 - 0.6

        starContainer.appendChild(star);
    }
    function createShootingStar() {
        const star = document.createElement("div");
        star.classList.add("shooting-star");

        const startX = Math.random() * window.innerWidth * 0.4;
        const startY = Math.random() * window.innerHeight * 0.3;

        star.style.top = `${startY}px`;
        star.style.left = `${startX}px`;

        starContainer.appendChild(star);

        setTimeout(() => star.remove(), 2500);
    }

    function startShootingStars() {
        setInterval(() => {
            createShootingStar();
        }, 3000);
    }

    startShootingStars();

    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;
        document.querySelectorAll(".star").forEach(star => {
            const speed = parseFloat(star.dataset.speed);
            star.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    window.addEventListener("scroll", function () {
        const header = document.querySelector(".transparent-header");
        const firstPanel = document.querySelector(".fullscreen-image.img1");
        const lastPanel = document.querySelector(".image-container:last-of-type");
    
        if (!firstPanel || !lastPanel) return;
    
        let firstPanelBottom = firstPanel.getBoundingClientRect().bottom;
        let lastPanelTop = lastPanel.getBoundingClientRect().top;
    
        if (firstPanelBottom > 0) {
            header.classList.remove("hide-header");
        } else if (firstPanelBottom < 0 && lastPanelTop > window.innerHeight) {
            header.classList.add("hide-header");
        }
    
        if (lastPanelTop < window.innerHeight) {
            header.classList.remove("hide-header");
        }
    });
});
