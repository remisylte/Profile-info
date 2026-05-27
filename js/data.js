/* ============================================
   Mini-SPA Database
   ============================================ */

const dbTabs = ["Ilustración", "Renders", "Editorial", "Edición", "Pieces", "Diseño Web"];
let activeTab = 0;

const databaseContent = document.getElementById("databaseContent");

/* ============================================
   Carrusel - Ilustración
   ============================================ */

const ilustracionImgs = [
    "picture/bae.jpg",
    "picture/masco plus.jpg",
    "picture/reinterpretacion.png",
    "picture/silver.jpeg",
    "picture/Syl va.jpg",
    "picture/tanjiro.jpeg",
];

let ilustracionActive = 0;

function renderIlustracion() {
    const container = document.getElementById("ilustracionContent");
    if (!container) return;

    const total = ilustracionImgs.length;
    const prev = (ilustracionActive - 1 + total) % total;
    const next = (ilustracionActive + 1) % total;

    container.innerHTML = `
        <div class="db-carousel">
            <div class="db-carousel-item db-side" data-index="${prev}">
                <img src="${ilustracionImgs[prev]}" alt="ilustración">
            </div>
            <div class="db-carousel-item db-center">
                <img src="${ilustracionImgs[ilustracionActive]}" alt="ilustración">
            </div>
            <div class="db-carousel-item db-side" data-index="${next}">
                <img src="${ilustracionImgs[next]}" alt="ilustración">
            </div>
        </div>
    `;

    container.querySelectorAll(".db-side").forEach(el => {
        el.addEventListener("click", () => {
            ilustracionActive = parseInt(el.dataset.index);
            renderIlustracion();
        });
    });
}

/* ============================================
   Visor - Renders
   ============================================ */

const rendersFiles = [
    { name: "RENDER_01.jpg",  type: "image", src: "picture/renders/sparxie try.png",  meta: { Name: "Sparxie",          Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_02.jpg",  type: "image", src: "picture/renders/iso room.png",     meta: { Name: "Room",              Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_03.jpg",  type: "image", src: "picture/renders/2.png",            meta: { Name: "room vista1",       Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_04.jpg",  type: "image", src: "picture/renders/3.png",            meta: { Name: "room vista2",       Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_05.jpg",  type: "image", src: "picture/renders/4.png",            meta: { Name: "room vista3",       Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_06.jpg",  type: "image", src: "picture/renders/5.png",            meta: { Name: "room vista4",       Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_07.jpg",  type: "image", src: "picture/renders/m1.png",           meta: { Name: "Miyabi",            Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_08.jpg",  type: "image", src: "picture/renders/m2.png",           meta: { Name: "M_V01",             Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_09.jpg",  type: "image", src: "picture/renders/m3.png",           meta: { Name: "M_V02",             Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_10.jpg",  type: "image", src: "picture/renders/m4.png",           meta: { Name: "M_V03",             Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_11.jpg",  type: "image", src: "picture/renders/m5.png",           meta: { Name: "M_V04",             Engine: "Cycles", Samples: "1024" } },
    { name: "RENDER_12.jpg",  type: "image", src: "picture/renders/m6.png",           meta: { Name: "M_V05",             Engine: "Cycles", Samples: "1024" } },
    { name: "ANIM_01.mp4",    type: "video", src: "video/ia animation.mp4",           meta: { Name: "Room ideal",        Engine: "EEVEE",  Samples: "64"   } },
    { name: "ANIM_02.mp4",    type: "video", src: "video/animation miyabi.mp4",       meta: { Name: "Carrusel miyabi",   Engine: "EEVEE",  Samples: "64"   } },
    { name: "ANIM_03.mp4",    type: "video", src: "video/animation.mp4",              meta: { Name: "Primera animacion", Engine: "2d",     Samples: "64"   } },
    { name: "VIDEO_01.mp4",   type: "video", src: "video/rende.mp4",                  meta: { Name: "Creacion rostro",   Engine: "EEVEE",  Samples: "64"   } },
];

let rendersActive = 0;

function renderRenders() {
    const container = document.getElementById("rendersContent");
    if (!container) return;

    const file = rendersFiles[rendersActive];

    const mediaHtml = file.type === "video"
        ? `<video src="${file.src}" controls class="renders-viewer-media"></video>`
        : `<img src="${file.src}" alt="${file.name}" class="renders-viewer-media">`;

    const metaHtml = Object.entries(file.meta)
        .map(([k, v]) => `<span class="renders-meta-item"><span class="renders-meta-key">${k}:</span> ${v}</span>`)
        .join("");

    container.innerHTML = `
        <div class="renders-layout">
            <div class="renders-list">
                ${rendersFiles.map((f, i) => `
                    <div class="renders-file ${i === rendersActive ? "active" : ""}" data-index="${i}">
                        <span class="renders-file-icon">${f.type === "video" ? "▶" : "◈"}</span>
                        <span class="renders-file-name">${f.name}</span>
                    </div>
                `).join("")}
            </div>
            <div class="renders-viewer">
                <div class="renders-viewer-screen">
                    ${mediaHtml}
                </div>
                <div class="renders-meta">
                    ${metaHtml}
                </div>
            </div>
        </div>
    `;

    container.querySelectorAll(".renders-file").forEach(el => {
        el.addEventListener("mouseenter", () => {
            rendersActive = parseInt(el.dataset.index);
            renderRenders();
        });
    });
}

/* ============================================
   Spread - Editorial
   ============================================ */

const editorialImgs = [
    "picture/ediotiral/portada.png",
    "picture/ediotiral/post.png",
    "picture/ediotiral/1.png",
    "picture/ediotiral/2.png",
    "picture/ediotiral/3.png",
    "picture/ediotiral/4.png",
    "picture/ediotiral/5.png",
    "picture/ediotiral/6.png",
    "picture/ediotiral/7.png",
    "picture/ediotiral/8.png",
    "picture/ediotiral/9.png",
    "picture/ediotiral/10.png",
];

let editorialPage = 0;

function renderEditorial() {
    const container = document.getElementById("editorialContent");
    if (!container) return;

    const total = editorialImgs.length;
    const pageNum  = String(editorialPage + 1).padStart(2, "0");
    const totalNum = String(total).padStart(2, "0");
    const progress = Math.round(((editorialPage + 1) / total) * 100);

    container.innerHTML = `
        <div class="editorial-spread">
            <button class="editorial-arrow left" id="editPrev">&#9664;</button>
            <div class="editorial-book">
                <div class="editorial-page">
                    <img src="${editorialImgs[editorialPage]}" alt="página ${editorialPage + 1}">
                    <span class="editorial-pagenum press-start-2p-regular">${pageNum}</span>
                </div>
            </div>
            <button class="editorial-arrow right" id="editNext">&#9654;</button>
        </div>
        <div class="editorial-footer">
            <span class="editorial-label press-start-2p-regular">PAGE ${pageNum} / ${totalNum}</span>
            <div class="editorial-progress-bar">
                <div class="editorial-progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>
    `;

    document.getElementById("editPrev").addEventListener("click", () => {
        if (editorialPage > 0) { editorialPage--; renderEditorial(); }
    });
    document.getElementById("editNext").addEventListener("click", () => {
        if (editorialPage < total - 1) { editorialPage++; renderEditorial(); }
    });
}

/* ============================================
   Monitor Triple - Edición
   ============================================ */

const edicionVideos = [
    { name: "EDIT_01.mp4", src: "video/tirada.mp4" },
    { name: "EDIT_02.mp4", src: "video/test project.mp4" },
    { name: "EDIT_03.mp4", src: "video/rende.mp4" },
];

let edicionFocus = 1;

function renderEdicion() {
    const container = document.getElementById("edicionContent");
    if (!container) return;

    container.innerHTML = `
        <div class="edicion-monitors">
            ${edicionVideos.map((v, i) => `
                <div class="edicion-monitor ${i === edicionFocus ? "focus" : "secondary"}" data-index="${i}">
                    <video src="${v.src}" ${i === edicionFocus ? "controls" : "muted loop autoplay"} class="edicion-video"></video>
                    <span class="edicion-label nova-square-regular">${v.name}</span>
                </div>
            `).join("")}
        </div>
    `;

    container.querySelectorAll(".edicion-monitor.secondary").forEach(el => {
        el.addEventListener("click", () => {
            edicionFocus = parseInt(el.dataset.index);
            renderEdicion();
        });
    });
}

/* ============================================
   Pieces - Carrusel Neón Dinámico
   ============================================ */

const piecesData = [
    { name: "PIEZA 01", src: "picture/primera.png", shadow: "rgba(222, 126, 87, 0.6)" },
    { name: "PIEZA 02", src: "picture/segunda.png", shadow: "rgba(67, 189, 255, 0.6)" },
    { name: "PIEZA 03", src: "picture/tercera.png", shadow: "rgba(194, 255, 38, 0.6)" },
    { name: "PIEZA 04", src: "picture/portada.jpg", shadow: "rgba(163, 112, 247, 0.6)" }
];

let piecesActive = 0;
let piecesInterval;

function renderPieces() {
    const container = document.getElementById("piecesContent");
    if (!container) return;

    container.innerHTML = `
        <div class="pieces-wrapper">
            <div class="pieces-track" id="piecesTrack">
                ${piecesData.map((pieza, i) => `
                    <div class="pieces-card" data-index="${i}">
                        <div class="pieces-img-container">
                            <img src="${pieza.src}" alt="${pieza.name}">
                            <div class="pieces-border" style="--neon: ${pieza.shadow}"></div>
                        </div>
                        <div class="pieces-name press-start-2p-regular" style="--text-neon: ${pieza.shadow}">
                            ${pieza.name}
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    function updateCarousel() {
        const track = document.getElementById("piecesTrack");
        if (!track) return;

        const cardWidth = 340; 
        track.style.transform = `translateX(calc(50% - ${(piecesActive * cardWidth) + (cardWidth / 2)}px))`;

        document.querySelectorAll(".pieces-card").forEach((card, i) => {
            if (i === piecesActive) {
                card.classList.add("is-center");
                card.classList.remove("is-side");
            } else {
                card.classList.remove("is-center");
                card.classList.add("is-side");
            }
        });
    }

    clearInterval(piecesInterval);
    piecesInterval = setInterval(() => {
        piecesActive = (piecesActive + 1) % piecesData.length;
        updateCarousel();
    }, 3000);

    container.querySelectorAll(".pieces-card").forEach(card => {
        card.addEventListener("click", () => {
            clearInterval(piecesInterval); 
            piecesActive = parseInt(card.dataset.index);
            updateCarousel();
            piecesInterval = setInterval(() => {
                piecesActive = (piecesActive + 1) % piecesData.length;
                updateCarousel();
            }, 3000);
        });
    });

    updateCarousel();
}

/* ============================================
   Diseño Web - Navegador Táctico (Iframes)
   ============================================ */

const webProjects = [
    { name: "Gomenasai", url: "https://remisylte.github.io/gomenasai/", status: "ONLINE" },
    { name: "Blue Archive - Kayoko", url: "https://remisylte.github.io/Blue-archive-kayoko/", status: "ONLINE" },
    { name: "Tang Tang Simp", url: "https://remisylte.github.io/Tang-tang-simp/", status: "ONLINE" }
];

let webActive = 0;

function renderWeb() {
    const container = document.getElementById("webContent");
    if (!container) return;

    const project = webProjects[webActive];

    container.innerHTML = `
        <div class="web-layout">
            <div class="web-sidebar">
                ${webProjects.map((p, i) => `
                    <div class="web-item ${i === webActive ? "active" : ""}" data-index="${i}">
                        <span class="web-item-icon">[${i + 1}]</span>
                        <div class="web-item-info">
                            <span class="web-item-name">${p.name}</span>
                            <span class="web-item-status" style="color: ${p.status === 'ONLINE' ? 'var(--celes)' : 'var(--moradiro)'}">${p.status}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div class="web-browser">
                <div class="web-browser-header">
                    <span class="web-browser-url nova-square-regular">TARGET: ${project.url}</span>
                    <div class="web-browser-controls">
                        <span>_</span><span>□</span><span>x</span>
                    </div>
                </div>
                <div class="web-browser-frame">
                    <iframe src="${project.url}" title="${project.name}" sandbox="allow-scripts allow-same-origin"></iframe>
                </div>
            </div>
        </div>
    `;

    container.querySelectorAll(".web-item").forEach(el => {
        el.addEventListener("click", () => {
            webActive = parseInt(el.dataset.index);
            renderWeb();
        });
    });
}

/* ============================================
   Contenido de cada tab
   ============================================ */

const dbContent = {
    "Ilustración": `<div class="db-section-content" id="ilustracionContent"></div>`,
    "Renders":     `<div class="db-section-content" id="rendersContent"></div>`,
    "Editorial":   `<div class="db-section-content" id="editorialContent"></div>`,
    "Edición":     `<div class="db-section-content" id="edicionContent"></div>`,
    "Pieces":      `<div class="db-section-content" id="piecesContent"></div>`,
    "Diseño Web":  `<div class="db-section-content" id="webContent"></div>`,
};

/* ============================================
   Renderiza los tabs
   ============================================ */

function renderDbTabs() {
    const bar = document.getElementById("dbTabsBar");
    if (!bar) return;

    bar.innerHTML = "";
    dbTabs.forEach((tab, i) => {
        const btn = document.createElement("div");
        btn.className = "db-tab" + (i === activeTab ? " active" : "");
        btn.innerHTML = `<span class="db-tab-dot"></span>${tab}`;
        btn.addEventListener("click", () => {
            activeTab = i;
            renderDbTabs();
            renderDbContent();
        });
        bar.appendChild(btn);
    });
}

/* ============================================
   Renderiza el contenido del tab activo
   ============================================ */

function renderDbContent() {
    const panel = document.getElementById("dbPanel");
    if (!panel) return;
    panel.innerHTML = dbContent[dbTabs[activeTab]];

    if (dbTabs[activeTab] === "Ilustración") renderIlustracion();
    if (dbTabs[activeTab] === "Renders")     renderRenders();
    if (dbTabs[activeTab] === "Editorial")   { editorialPage = 0; renderEditorial(); }
    if (dbTabs[activeTab] === "Edición")     { edicionFocus = 1;  renderEdicion();   }
    if (dbTabs[activeTab] === "Pieces")      renderPieces();
    if (dbTabs[activeTab] === "Diseño Web")  renderWeb();
}

/* ============================================
   Inicializa el HTML del mini-SPA
   ============================================ */

function initDatabase() {
    databaseContent.innerHTML = `
        <div class="db-tabs-bar" id="dbTabsBar"></div>
        <div class="db-panel" id="dbPanel"></div>
    `;
    renderDbTabs();
    renderDbContent();
}

initDatabase();