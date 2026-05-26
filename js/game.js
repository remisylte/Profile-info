const items = ["Logs", "Profile", "Stats", "Database"];
let activeIndex = 1;
let isAnimating = false;

const track = document.getElementById("menuTrack");
const rightPanel = document.getElementById("rightPanel");

function updateContent() {
    const profileContent = document.getElementById("profileContent");
    const statsContent = document.getElementById("statsContent");
    const databaseContent = document.getElementById("databaseContent");
    const logsContent = document.getElementById("logsContent");

    if (items[activeIndex] === "Logs") {
        if (logsContent) logsContent.style.display = "flex";
        if (profileContent) profileContent.style.display = "none";
        if (statsContent) statsContent.style.display = "none";
        if (databaseContent) databaseContent.style.display = "none";
        rightPanel.querySelector(".placeholder")?.remove();
        return;
    }

    if (items[activeIndex] === "Profile") {
        if (profileContent) profileContent.style.display = "flex";
        if (statsContent) statsContent.style.display = "none";
        if (databaseContent) databaseContent.style.display = "none";
        if (logsContent) logsContent.style.display = "none";
        rightPanel.querySelector(".placeholder")?.remove();
        return;
    }

    if (items[activeIndex] === "Stats") {
        if (statsContent) statsContent.style.display = "flex";
        if (profileContent) profileContent.style.display = "none";
        if (databaseContent) databaseContent.style.display = "none";
        if (logsContent) logsContent.style.display = "none";
        rightPanel.querySelector(".placeholder")?.remove();
        colocarPorcentajes();
        return;
    }

    if (items[activeIndex] === "Database") {
        if (databaseContent) databaseContent.style.display = "block";
        if (profileContent) profileContent.style.display = "none";
        if (statsContent) statsContent.style.display = "none";
        if (logsContent) logsContent.style.display = "none";
        rightPanel.querySelector(".placeholder")?.remove();
        return;
    }

    if (profileContent) profileContent.style.display = "none";
    if (statsContent) statsContent.style.display = "none";
    if (databaseContent) databaseContent.style.display = "none";
    if (logsContent) logsContent.style.display = "none";
}

function colocarPorcentajes() {
    document.querySelectorAll(".stat-porcentaje").forEach(el => el.remove());

    requestAnimationFrame(() => {
        document.querySelectorAll(".stat-item").forEach(item => {
            const barra = item.querySelector(".stat-barra");
            if (!barra) return;

            const allSpans = barra.querySelectorAll("span:not(.stat-porcentaje)");
            const filledSpans = barra.querySelectorAll(".filled");
            const count = filledSpans.length;
            if (count === 0) return;

            const lastFilled = filledSpans[count - 1];
            const barraRect = barra.getBoundingClientRect();
            const lastRect = lastFilled.getBoundingClientRect();

            const leftPos = lastRect.left - barraRect.left + lastRect.width / 2;
            const porcentaje = Math.round((count / allSpans.length) * 100);

            const label = document.createElement("span");
            label.className = "stat-porcentaje";
            label.textContent = porcentaje + "%";
            label.style.left = leftPos + "px";

            const delaySegundos = count * 0.1 + 0.4;
            label.style.setProperty("--delay-porcentaje", delaySegundos + "s");

            barra.appendChild(label);
        });
    });
}

function getOrderedItems() {
    const total = items.length;
    const ordered = [];
    for (let i = -2; i <= 2; i++) {
        let idx = (activeIndex + i + total) % total;
        ordered.push({ name: items[idx], realIndex: idx, offset: i });
    }
    return ordered;
}

function render() {
    track.innerHTML = "";
    getOrderedItems().forEach(({ name, realIndex, offset }) => {
        const div = document.createElement("div");
        div.className = "menu-item" + (offset === 0 ? " active" : "");
        div.dataset.offset = offset;

        if (offset === 0) {
            div.innerHTML = `
                <div class="active-shape">
                    <span class="active-label">${name}</span>
                </div>
            `;
        } else {
            div.innerHTML = `
                <span class="menu-arrow">▶</span>
                <span class="menu-label">${name}</span>
            `;
            div.addEventListener("click", () => {
                if (isAnimating) return;
                animateTo(realIndex, offset);
            });
        }

        track.appendChild(div);
    });

    updateContent();
}

function animateTo(newIndex, clickedOffset) {
    isAnimating = true;
    const itemHeight = 80;
    const moveAmount = clickedOffset * itemHeight;
    const menuItems = track.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        const offset = parseInt(item.dataset.offset);
        if (offset === 0) return;

        item.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease";
        item.style.transform = `translateY(${-moveAmount}px)`;

        const newOffset = offset - clickedOffset;
        if (newOffset < -2 || newOffset > 2) {
            item.style.opacity = "0";
        }
    });

    setTimeout(() => {
        activeIndex = newIndex;
        render();
        isAnimating = false;
    }, 400);
}

render();

/* ============================================
   Música de fondo
   ============================================ */

const music = document.getElementById("bgMusic");
music.volume = 0.5;
const musicBtn = document.querySelector(".icon-settings");
let started = false;

document.addEventListener("click", () => {
    if (!started) {
        music.play();
        started = true;
        musicBtn.style.opacity = "1";
    }
});

musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!started) {
        music.play();
        started = true;
        musicBtn.style.opacity = "1";
        return;
    }
    if (music.muted) {
        music.muted = false;
        musicBtn.style.opacity = "1";
    } else {
        music.muted = true;
        musicBtn.style.opacity = "0.4";
    }
});