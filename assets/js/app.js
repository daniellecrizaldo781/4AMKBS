/* =====================================================================
   4AM MEDIA KNOWLEDGE BASE — APP CONTROLLER
   Hash router, shell wiring, global search, mobile drawer.
   ===================================================================== */

(function () {
  "use strict";

  const Pages = window.KBPages;
  const Comps = window.KBComponents;
  const D = window.KB;

  const appContent = document.getElementById("app-content");
  const overlay = document.getElementById("overlay");
  const breadcrumbs = document.getElementById("breadcrumbs"); // may be null (top-bar layout)
  const navItems = Array.from(document.querySelectorAll(".nav__item"));
  const brandHeader = document.getElementById("brand-mark-header");
  const globalInput = document.getElementById("global-search-input");
  const searchDropdown = document.getElementById("search-dropdown");

  /* ---- Inject brand mark ---- */
  if (brandHeader) brandHeader.innerHTML = Comps.brandMark(46);

  /* --------------------------- ROUTER --------------------------- */
  function parseHash() {
    let h = location.hash.replace(/^#\/?/, "");          // "cascades/refund-request"
    const [path, query] = h.split("?");
    const segs = path.split("/").filter(Boolean);          // ["cascades","refund-request"]
    const params = {};
    if (query) query.split("&").forEach(kv => {
      const [k, v] = kv.split("=");
      params[k] = v == null ? "" : v;
    });
    return { segs, params };
  }

  const SECTION_TITLES = {
    dashboard: "Dashboard",
    cascades: "Cascade & Handling Updates",
    products: "Products",
    resources: "Resources",
    handbook: "Handbook & Policies",
    team: "Our Team",
    search: "Search"
  };

  function render() {
    const { segs, params } = parseHash();
    const section = segs[0] || "dashboard";
    let html = "";
    let title = SECTION_TITLES[section] || "Knowledge Base";

    switch (section) {
      case "dashboard": html = Pages.dashboard(); break;
      case "cascades":
        if (segs[1]) { html = Pages.cascadeDetail(segs[1]); title = "Cascade"; }
        else { html = Pages.cascades(params); }
        break;
      case "products":
        if (segs[1]) { html = Pages.productDetail(segs[1]); title = "Product"; }
        else { html = Pages.products(); }
        break;
      case "resources": html = Pages.resources(); break;
      case "handbook":  html = Pages.handbook(); break;
      case "team":      html = Pages.team(); break;
      case "search":    html = Pages.search(params); title = "Search"; break;
      default:          html = Pages.notFound("Page not found", "That route doesn't exist yet.", "#/dashboard"); title = "Not Found";
    }

    appContent.innerHTML = html;
    appContent.scrollTop = 0;
    window.scrollTo(0, 0);

    setActiveNav(section);
    renderBreadcrumbs(segs, title);
    wirePageInteractions(section, params);
    closeNav();
    document.title = (title === "Dashboard" ? "4AM Media Knowledge Base" : `${title} · 4AM KB`);
  }

  /* --------------------------- NAV STATE --------------------------- */
  function setActiveNav(section) {
    navItems.forEach(a => a.classList.toggle("is-active", a.dataset.section === section));
  }

  /* --------------------------- BREADCRUMBS --------------------------- */
  function renderBreadcrumbs(segs, title) {
    if (!breadcrumbs) return; // top-bar layout has no header breadcrumb
    const section = segs[0] || "dashboard";
    let parts = [`<a href="#/dashboard">Home</a>`];
    if (section !== "dashboard") {
      parts.push(`<a href="#/${section}">${Comps.esc(SECTION_TITLES[section] || section)}</a>`);
    }
    // Detail pages already render their own inline breadcrumbs; avoid duplication
    // by only showing the top-level trail in the header for list/section pages.
    if (segs.length > 1) {
      breadcrumbs.innerHTML = parts.join('<span class="sep">/</span>');
      return;
    }
    breadcrumbs.innerHTML = parts.join('<span class="sep">/</span>');
  }

  /* --------------------- PAGE-SPECIFIC WIRING --------------------- */
  function wirePageInteractions(section, params) {
    // Cascade search + chips
    const cSearch = document.getElementById("cascade-search");
    if (cSearch) {
      let to;
      cSearch.addEventListener("input", (e) => {
        clearTimeout(to);
        const v = encodeURIComponent(e.target.value);
        to = setTimeout(() => {
          const base = "#/cascades";
          const cat = (params && params.cat) ? `cat=${encodeURIComponent(decodeURIComponent(params.cat))}` : "";
          const q = e.target.value ? `q=${v}` : "";
          const join = (cat || q) ? "?" : "";
          const amp = (cat && q) ? "&" : "";
          location.hash = base + join + cat + amp + q;
        }, 250);
      });
    }
    document.querySelectorAll("#cascade-chips .chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const cat = chip.dataset.cat;
        const cur = parseHash().params;
        const q = cur.q ? `q=${cur.q}` : "";
        const c = cat !== "all" ? `cat=${encodeURIComponent(cat)}` : "";
        const join = (c || q) ? "?" : "";
        const amp = (c && q) ? "&" : "";
        location.hash = "#/cascades" + join + c + amp + q;
      });
    });

    // Search page input
    const spInput = document.getElementById("search-page-input");
    if (spInput) {
      spInput.focus();
      spInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && spInput.value.trim()) {
          location.hash = "#/search?q=" + encodeURIComponent(spInput.value.trim());
        }
      });
    }
  }

  /* --------------------------- MOBILE DRAWER --------------------------- */
  function openNav() { document.body.classList.add("nav-open"); overlay.hidden = false; }
  function closeNav() { document.body.classList.remove("nav-open"); overlay.hidden = true; }

  document.getElementById("hamburger").addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
    overlay.hidden = !document.body.classList.contains("nav-open");
  });
  overlay.addEventListener("click", closeNav);
  // Close the mobile dropdown after tapping a nav link
  document.getElementById("primary-nav").addEventListener("click", (e) => {
    if (e.target.closest(".nav__item")) closeNav();
  });

  /* --------------------------- GLOBAL SEARCH --------------------------- */
  let searchTimeout;
  function runGlobalSearch(q) {
    q = q.trim();
    if (!q) { searchDropdown.hidden = true; searchDropdown.innerHTML = ""; return; }
    const t = q.toLowerCase();
    const out = [];

    D.cascades.forEach(c => {
      if ([c.title, c.desc, c.category, c.product].join(" ").toLowerCase().includes(t))
        out.push({ type: "Cascade", title: c.title, meta: `${c.category} · ${c.product}`, href: `#/cascades/${c.id}` });
    });
    D.products.forEach(p => {
      if ([p.name, p.category].join(" ").toLowerCase().includes(t))
        out.push({ type: "Product", title: p.name, meta: p.category, href: `#/products/${p.slug}` });
    });
    D.resourceCategories.forEach(cat => cat.items.forEach(r => {
      if ([r.name, cat.name].join(" ").toLowerCase().includes(t))
        out.push({ type: "Resource", title: r.name, meta: cat.name, href: "#/resources" });
    }));
    D.handbookCategories.forEach(cat => {
      if (cat.name.toLowerCase().includes(t))
        out.push({ type: "Handbook", title: cat.name, meta: "Policy", href: "#/handbook" });
    });

    if (!out.length) {
      searchDropdown.innerHTML = `<div class="search__empty">No matches for “${Comps.esc(q)}”.</div>`;
      searchDropdown.hidden = false;
      return;
    }
    // Group lightly
    const groups = {};
    out.slice(0, 12).forEach(m => { (groups[m.type] = groups[m.type] || []).push(m); });
    let html = "";
    Object.keys(groups).forEach(type => {
      html += `<div class="search__section-label">${Comps.esc(type)}</div>`;
      html += groups[type].map(m =>
        `<a class="search__result" href="${m.href}">
          <span class="search__result-title">${Comps.esc(m.title)}</span>
          <span class="search__result-meta">${Comps.esc(m.meta)}</span>
        </a>`).join("");
    });
    html += `<div class="search__section-label" style="border-top:1px solid var(--border);margin-top:4px;padding-top:8px;">
      <a class="search__result" href="#/search?q=${encodeURIComponent(q)}" style="padding-left:0;">See all results for “${Comps.esc(q)}” &rarr;</a>
    </div>`;
    searchDropdown.innerHTML = html;
    searchDropdown.hidden = false;

    searchDropdown.querySelectorAll(".search__result").forEach(a => {
      a.addEventListener("click", () => { searchDropdown.hidden = true; globalInput.value = ""; });
    });
  }

  globalInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    const v = e.target.value;
    searchTimeout = setTimeout(() => runGlobalSearch(v), 160);
  });
  globalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && globalInput.value.trim()) {
      searchDropdown.hidden = true;
      location.hash = "#/search?q=" + encodeURIComponent(globalInput.value.trim());
      globalInput.value = "";
    }
    if (e.key === "Escape") { searchDropdown.hidden = true; globalInput.blur(); }
  });
  document.addEventListener("click", (e) => {
    if (!document.getElementById("global-search").contains(e.target)) searchDropdown.hidden = true;
  });

  /* --------------------------- BOOT --------------------------- */
  window.addEventListener("hashchange", render);
  if (!location.hash) location.hash = "#/dashboard";
  render();
})();
