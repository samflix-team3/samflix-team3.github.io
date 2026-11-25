/* =========================================================
   SAMFLIX 동작 스크립트
   - 필터(전체/영화/드라마/팀원별) + 검색
   - 가운데 카드가 강조되는 캐러셀 (화살표, 점, 키보드, 스와이프)
   - PICKS 그리드, TEAM 목록, 상세 모달
   ========================================================= */

(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  const TYPE_LABEL = { movie: "영화", drama: "드라마" };
  const escapeHTML = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const memberById = Object.fromEntries(TEAM.map(m => [m.id, m]));

  // 원본 데이터에 고유 번호 붙이기
  const ALL = PICKS.map((p, i) => ({ ...p, id: i }));

  const state = { type: "all", member: "all", query: "", current: 0 };
  let list = ALL.slice();

  /* ---------- 공통: 포스터 HTML ---------- */
  function posterHTML(p, { showTitle = true } = {}) {
    const img = p.poster
      ? `<img src="${p.poster}" alt="${p.title} 포스터" loading="lazy" />`
      : `<div class="poster__art poster--${p.theme || "galaxy"}"></div>`;
    const title = showTitle && !p.poster ? `<span class="poster__title">${p.title}</span>` : "";
    return `${img}${title}<span class="badge badge--${p.type}">${TYPE_LABEL[p.type] || ""}</span>`;
  }

  function avatarHTML(memberId) {
    const m = memberById[memberId];
    return `<span class="avatar" aria-hidden="true">${m ? m.name.slice(0, 1) : "?"}</span>`;
  }

  function pickByHTML(p) {
    const m = memberById[p.member];
    return `${avatarHTML(p.member)}<span>${m ? m.name : "팀원"}'s Pick</span>`;
  }

  function ratingHTML(r) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>${Number(r).toFixed(1)}`;
  }

  /* ---------- 필터 적용 ---------- */
  function applyFilters() {
    const q = state.query.trim().toLowerCase();
    list = ALL.filter(p => {
      if (state.type !== "all" && p.type !== state.type) return false;
      if (state.member !== "all" && p.member !== state.member) return false;
      if (q) {
        const m = memberById[p.member];
        const hay = [p.title, p.genre, p.oneLine, m && m.name, TYPE_LABEL[p.type]].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    state.current = Math.min(state.current, Math.max(list.length - 1, 0));
    renderCarousel();
    renderGrid();
  }

  /* ---------- 캐러셀 ---------- */
  const track = $("#track");
  const dots = $("#dots");

  function renderCarousel() {
    $("#emptyMsg").hidden = list.length > 0;
    track.innerHTML = list.map((p, i) => `
      <article class="card" data-index="${i}" tabindex="-1" aria-label="${p.title}">
        <div class="poster">${posterHTML(p)}</div>
        <div class="card__meta">
          <span class="pick-by">${pickByHTML(p)}</span>
          <span class="rating">${ratingHTML(p.rating)}</span>
        </div>
      </article>`).join("");

    dots.innerHTML = list.map((p, i) =>
      `<button class="dot" role="tab" aria-label="${i + 1}번째 작품: ${p.title}" data-index="${i}"></button>`
    ).join("");

    const single = list.length <= 1;
    $("#prevBtn").hidden = single;
    $("#nextBtn").hidden = single;
    layout();
  }

  function layout() {
    const n = list.length;
    $$(".card", track).forEach((card, i) => {
      let o = i - state.current;
      // 양 끝이 이어지도록 (무한 회전처럼 보이게)
      if (n > 2) {
        if (o > n / 2) o -= n;
        if (o < -n / 2) o += n;
      }
      card.dataset.pos = Math.abs(o) > 2 ? "hidden" : String(o);
      card.classList.toggle("is-active", o === 0);
      card.setAttribute("aria-hidden", o === 0 ? "false" : "true");
    });
    $$(".dot", dots).forEach((d, i) => {
      d.classList.toggle("is-active", i === state.current);
      d.setAttribute("aria-selected", i === state.current);
    });
  }

  function go(delta) {
    const n = list.length;
    if (!n) return;
    state.current = (state.current + delta + n) % n;
    layout();
  }

  function goTo(i) {
    state.current = i;
    layout();
  }

  $("#prevBtn").addEventListener("click", () => { go(-1); restartAuto(); });
  $("#nextBtn").addEventListener("click", () => { go(1); restartAuto(); });

  dots.addEventListener("click", e => {
    const b = e.target.closest(".dot");
    if (b) { goTo(+b.dataset.index); restartAuto(); }
  });

  track.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (!card) return;
    const i = +card.dataset.index;
    if (i === state.current) openModal(list[i]);
    else { goTo(i); restartAuto(); }
  });

  // 키보드 ← →
  document.addEventListener("keydown", e => {
    if (!$("#modal").hidden) { if (e.key === "Escape") closeModal(); return; }
    if (document.activeElement && document.activeElement.tagName === "INPUT") return;
    if (e.key === "ArrowLeft") { go(-1); restartAuto(); }
    if (e.key === "ArrowRight") { go(1); restartAuto(); }
  });

  // 모바일 스와이프
  let touchX = null;
  track.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { go(dx < 0 ? 1 : -1); restartAuto(); }
    touchX = null;
  });

  // 자동 넘김 (마우스를 올리면 멈춤)
  let timer = null;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function startAuto() { if (!reduceMotion) timer = setInterval(() => go(1), 6000); }
  function stopAuto() { clearInterval(timer); timer = null; }
  function restartAuto() { stopAuto(); startAuto(); }
  const carouselEl = $("#carousel");
  carouselEl.addEventListener("mouseenter", stopAuto);
  carouselEl.addEventListener("mouseleave", startAuto);

  /* ---------- 필터 버튼 ---------- */
  $$(".chip[data-type]").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".chip[data-type]").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.type = btn.dataset.type;
      state.current = 0;
      applyFilters();
    });
  });

  /* ---------- 팀원별 보기 드롭다운 ---------- */
  const memberBtn = $("#memberBtn");
  const memberMenu = $("#memberMenu");
  memberMenu.innerHTML =
    `<li role="option" data-member="all" class="is-active">모든 팀원</li>` +
    TEAM.map(m => `<li role="option" data-member="${m.id}">${avatarHTML(m.id)}${m.name}</li>`).join("");

  function toggleMenu(open) {
    const willOpen = open ?? !memberMenu.classList.contains("is-open");
    memberMenu.classList.toggle("is-open", willOpen);
    memberBtn.setAttribute("aria-expanded", willOpen);
  }
  memberBtn.addEventListener("click", e => { e.stopPropagation(); toggleMenu(); });
  document.addEventListener("click", () => toggleMenu(false));

  function setMember(id) {
    state.member = id;
    state.current = 0;
    $$("li", memberMenu).forEach(li => li.classList.toggle("is-active", li.dataset.member === id));
    $("#memberLabel").textContent = id === "all" ? "팀원별 보기" : `${memberById[id].name}'s Pick`;
    memberBtn.classList.toggle("is-active", id !== "all");
    applyFilters();
  }
  memberMenu.addEventListener("click", e => {
    const li = e.target.closest("li");
    if (li) setMember(li.dataset.member);
  });

  /* ---------- 검색 ---------- */
  const searchInput = $("#searchInput");
  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    state.current = 0;
    applyFilters();
  });
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- PICKS 그리드 ---------- */
  function renderGrid() {
    const grid = $("#grid");
    if (!list.length) {
      grid.innerHTML = `<p class="grid__empty">조건에 맞는 작품이 없어요 🎬</p>`;
      return;
    }
    grid.innerHTML = list.map(p => `
      <button class="tile" data-id="${p.id}">
        <div class="poster">${posterHTML(p)}</div>
        <div class="tile__body">
          <h3 class="tile__title">${p.title}</h3>
          <p class="tile__sub">${p.year} · ${p.genre}</p>
          <div class="card__meta card__meta--tile">
            <span class="pick-by">${pickByHTML(p)}</span>
            <span class="rating">${ratingHTML(p.rating)}</span>
          </div>
        </div>
      </button>`).join("");
  }
  $("#grid").addEventListener("click", e => {
    const t = e.target.closest(".tile");
    if (t) openModal(ALL[+t.dataset.id]);
  });

  /* ---------- TEAM ---------- */
  function renderTeam() {
    $("#teamList").innerHTML = TEAM.map(m => {
      const picks = ALL.filter(p => p.member === m.id);
      return `
        <article class="member">
          <div class="member__head">
            <span class="avatar avatar--lg">${m.name.slice(0, 1)}</span>
            <div>
              <h3 class="member__name">${m.name}</h3>
              <p class="member__role">${m.role}</p>
            </div>
          </div>
          <p class="member__intro">${m.intro}</p>
          <ul class="member__picks">
            ${picks.map(p => `
              <li><button data-id="${p.id}">
                <span class="mini-poster">${posterHTML(p, { showTitle: false })}</span>
                <span class="member__pick-text"><strong>${p.title}</strong><small>${TYPE_LABEL[p.type]} · ${p.year}</small></span>
              </button></li>`).join("")}
          </ul>
          <button class="member__more" data-member="${m.id}">캐러셀에서 보기 →</button>
        </article>`;
    }).join("");
  }
  $("#teamList").addEventListener("click", e => {
    const pick = e.target.closest("[data-id]");
    if (pick) return openModal(ALL[+pick.dataset.id]);
    const more = e.target.closest(".member__more");
    if (more) {
      setMember(more.dataset.member);
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    }
  });

  /* ---------- 모달 ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  function openModal(p) {
    lastFocus = document.activeElement;
    const m = memberById[p.member];
    $("#modalPoster").innerHTML = `<div class="poster">${posterHTML(p)}</div>`;
    $("#modalMeta").textContent = `${TYPE_LABEL[p.type]} · ${p.year} · ${p.genre}`;
    $("#modalTitle").textContent = p.title;
    $("#modalOneLine").textContent = p.oneLine;
    $("#modalReview").textContent = p.review;
    $("#modalBy").innerHTML = pickByHTML(p) + (m ? `<small>${m.role}</small>` : "");
    $("#modalRating").innerHTML = ratingHTML(p.rating);

    // 마음에 들었던 점
    const likes = Array.isArray(p.likes) ? p.likes : [];
    $("#modalLikes").innerHTML = likes.length
      ? likes.map(t => `<li>${escapeHTML(t)}</li>`).join("")
      : `<li class="is-empty">아직 작성하지 않았어요.</li>`;

    // 팀원 코멘트
    const comments = Array.isArray(p.comments) ? p.comments : [];
    $("#commentCount").textContent = comments.length ? comments.length : "";
    $("#commentList").innerHTML = comments.length
      ? comments.map(c => {
          const cm = memberById[c.member];
          return `
            <li class="comment">
              <span class="avatar avatar--md" aria-hidden="true">${cm ? cm.name.slice(0, 1) : "?"}</span>
              <div class="comment__body">
                <p class="comment__who"><strong>${cm ? cm.name : "팀원"}</strong>${cm ? `<small>${cm.role}</small>` : ""}</p>
                <p class="comment__text">${escapeHTML(c.text || "")}</p>
              </div>
            </li>`;
        }).join("")
      : `<li class="comments__empty">아직 코멘트가 없어요. 첫 코멘트를 남겨 주세요!</li>`;
    $(".modal__body", modal).scrollTop = 0;
    $(".modal__comments", modal).scrollTop = 0;

    modal.hidden = false;
    document.body.classList.add("no-scroll");
    stopAuto();
    $(".modal__close", modal).focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    startAuto();
    if (lastFocus) lastFocus.focus();
  }
  modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });

  /* ---------- 극장 좌석 장식 ---------- */
  function renderSeats() {
    const rows = [14, 12];
    $("#seats").innerHTML = rows.map((count, r) =>
      `<div class="seats__row seats__row--${r}">${'<span class="seat"></span>'.repeat(count)}</div>`
    ).join("");
  }

  /* ---------- ABOUT 숫자 ---------- */
  function renderStats() {
    $("#statPeople").textContent = TEAM.length;
    $("#statWorks").textContent = ALL.length;
    const avg = ALL.reduce((s, p) => s + Number(p.rating), 0) / (ALL.length || 1);
    $("#statAvg").textContent = avg.toFixed(1);
  }

  /* ---------- 내비게이션: 스크롤 위치에 따라 활성 표시 ---------- */
  const navLinks = $$(".nav__link");
  const sections = navLinks.map(a => document.querySelector(a.getAttribute("href")));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => s && io.observe(s));

  // 모바일 메뉴
  $("#menuBtn").addEventListener("click", () => document.body.classList.toggle("menu-open"));
  navLinks.forEach(a => a.addEventListener("click", () => document.body.classList.remove("menu-open")));

  /* ---------- 커튼 인트로 ---------- */
  const intro = $("#intro");
  if (intro) {
    const finishIntro = () => {
      intro.remove();
      document.body.classList.remove("intro-playing");
    };
    if (reduceMotion) {
      finishIntro();
    } else {
      document.body.classList.add("intro-playing");
      // 클릭하거나 아무 키나 누르면 바로 열기
      const skip = () => intro.classList.add("is-skipped");
      intro.addEventListener("click", skip);
      document.addEventListener("keydown", skip, { once: true });
      intro.addEventListener("animationend", e => {
        if (e.target === intro) finishIntro();
      });
      setTimeout(finishIntro, 4000); // 혹시 몰라 4초 뒤에는 무조건 제거
    }
  }

  /* ---------- 시작 ---------- */
  // 시안처럼 처음엔 두 번째 작품(가운데 강조)부터 보여주고 싶다면 아래 숫자를 바꾸세요.
  state.current = Math.min(2, ALL.length - 1);
  renderSeats();
  renderTeam();
  renderStats();
  applyFilters();
  startAuto();
})();
