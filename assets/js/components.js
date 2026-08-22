/* =====================================================================
   4AM MEDIA KNOWLEDGE BASE — REUSABLE COMPONENTS
   Pure functions that return HTML strings. Reused across all pages.
   ===================================================================== */

window.KBComponents = (function () {
  "use strict";

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  /* ---------- Brand mark (real 4AM Media logo) ----------
     Uses assets/img/4am-logo-transparent.png (knocked-out transparent) so it
     sits cleanly on both the navy sidebar and the white header. */
  function brandMark(height) {
    height = height || 46;
    return `<img src="assets/img/4am-logo-transparent.png" alt="4AM Media" style="height:${height}px;width:auto;display:block;" />`;
  }

  /* ---------- Page header ---------- */
  function pageHead(title, sub) {
    return `<div class="page-head">
      <h1 class="page-title">${esc(title)}</h1>
      ${sub ? `<p class="page-sub">${esc(sub)}</p>` : ""}
    </div>`;
  }

  /* ---------- Notice (placeholder content banner) ---------- */
  function notice(text) {
    return `<div class="notice"><span class="notice__icon">&#9432;</span><span>${esc(text)}</span></div>`;
  }

  /* ---------- Empty state ---------- */
  function emptyState(icon, title, desc) {
    return `<div class="empty">
      <div class="empty__icon">${icon || "&#128269;"}</div>
      <div class="empty__title">${esc(title)}</div>
      ${desc ? `<p class="empty__desc">${esc(desc)}</p>` : ""}
    </div>`;
  }

  /* ---------- Status: 4-state model (NEW/CURRENT, ACTIVE/EXISTING, SUPERSEDED, RETIRED) ---------- */
  // Single source of truth for the cascade status system. Text is always visible
  // (not color-only) so the meaning is accessible even without color perception.
  const STATUS_META = {
    "new":       { label: "NEW / CURRENT",   short: "NEW / CURRENT",   color: "green",  dot: "🟢", desc: "Latest cascade or recently updated handling." },
    "active":    { label: "ACTIVE / EXISTING", short: "ACTIVE / EXISTING", color: "blue", dot: "🔵", desc: "Older cascade, but the handling is still currently implemented." },
    "superseded":{ label: "SUPERSEDED",       short: "SUPERSEDED",      color: "amber", dot: "🟡", desc: "Older cascade that has been replaced by a newer handling." },
    "retired":   { label: "RETIRED",          short: "RETIRED",         color: "red",   dot: "🔴", desc: "Cascade/handling that is no longer implemented and should not be followed." }
  };
  function statusMeta(status) {
    return STATUS_META[(status || "").toLowerCase()] || STATUS_META["active"];
  }
  // Compact, polished status chip/badge — text stays visible (color is an accent, not the only signal).
  function statusChip(status) {
    const m = statusMeta(status);
    return `<span class="status-chip status-chip--${m.color}" title="${esc(m.desc)}">
      <span class="status-chip__dot" aria-hidden="true">${m.dot}</span>${esc(m.label)}
    </span>`;
  }
  // Small legend block for the Cascade & Handling page.
  function statusLegend() {
    const rows = Object.keys(STATUS_META).map(k => {
      const m = STATUS_META[k];
      return `<span class="legend__item"><span class="status-chip status-chip--${m.color}">
        <span class="status-chip__dot" aria-hidden="true">${m.dot}</span>${esc(m.label)}</span>
        <span class="legend__desc">${esc(m.desc)}</span></span>`;
    }).join("");
    return `<div class="legend" aria-label="Cascade status legend">${rows}</div>`;
  }

  /* ---------- Dashboard / section nav card ---------- */
  function navCard(icon, title, desc, href) {
    return `<a class="card card--link navcard" href="${esc(href)}">
      <span class="navcard__icon">${icon}</span>
      <span class="navcard__title">${esc(title)}</span>
      <span class="navcard__desc">${esc(desc)}</span>
      <span class="navcard__go">Open &rarr;</span>
    </a>`;
  }

  /* ---------- Category card ---------- */
  function catCard(title, count, href) {
    return `<a class="card card--link catcard" href="${esc(href)}">
      <span class="catcard__dot"></span>
      <span class="catcard__title">${esc(title)}</span>
      ${count != null ? `<span class="catcard__count">${esc(count)}</span>` : ""}
    </a>`;
  }

  /* ---------- Product card ---------- */
  function productPlaceholder(group, name) {
    const label = name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
    return `<div class="product-card__ph product-card__ph--${esc(group)}">
      <span class="ph-mark">&#128230;</span>
      <span>${esc(label)}</span>
    </div>`;
  }
  function productCard(p) {
    const img = p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`
      : productPlaceholder(p.group, p.name);
    return `<a class="card card--link product-card" href="#/products/${esc(p.slug)}">
      <div class="product-card__img">${img}</div>
      <div class="product-card__body">
        <div class="product-card__cat">${esc(p.category)}</div>
        <div class="product-card__name">${esc(p.name)}</div>
      </div>
    </a>`;
  }

  /* ---------- Cascade sample image (zoomable) ---------- */
  function cascadeImg(c) {
    if (c.sampleImageUrl)
      return `<div class="detail-img zoomable-img" data-full="${esc(c.sampleImageUrl)}" data-alt="${esc(c.title)} — sample image" onclick="KBZoom.open(event,this)"><img src="${esc(c.sampleImageUrl)}" alt="${esc(c.title)} — sample image" loading="lazy" onerror="KBZoom.fail(this)" /></div>`;
    if (c.sampleImage)
      return `<div class="detail-imgref">🖼️ Sample image: <code>${esc(c.sampleImage)}</code></div>`;
    return "";
  }

  /* ---------- Cascade list item (collapsible: title first, click to expand) ---------- */
  function cascadeItem(c, cascades) {
    const ch = c.channel ? `<span class="pill pill--channel">${esc(c.channelIcon || "")} ${esc(c.channel)}</span>` : "";
    const full = `
      ${cascadeImg(c)}
      <section class="section">
        <h2 class="section__title">Handling History</h2>
        <p class="muted" style="font-size:13.5px;margin-top:-6px;">The newest handling is shown first and is always the one to follow. Older versions are kept for reference and are not to be applied.</p>
        ${versionBlock(c.versions)}
      </section>
      ${supersededInline(c, cascades)}`;
    return `<div class="card cascade-item" data-cid="${esc(c.id)}">
      <button type="button" class="cascade-item__header" aria-expanded="false">
        <span class="cascade-item__chevron" aria-hidden="true">&#9656;</span>
        <span class="cascade-item__head-main">
          <span class="cascade-item__title">${esc(c.title)}</span>
          ${statusChip(c.status)}
        </span>
        <span class="cascade-item__meta">
          <span><b>${esc(c.category)}</b></span>
          ${ch}
          ${c.product ? `<span>${esc(c.product)}</span>` : ""}
          ${c.cascadedBy ? `<span>Cascaded by ${esc(c.cascadedBy)}</span>` : ""}
          <span>Updated ${esc(c.date)}</span>
        </span>
      </button>
      <div class="cascade-item__panel" hidden>
        ${full}
        <a class="cascade-item__more" href="#/cascades/${esc(c.id)}">Open full page &rarr;</a>
      </div>
    </div>`;
  }

  /* ---------- Version history block (current vs previous) ---------- */
  function versionBlock(versions) {
    if (!versions || !versions.length) return "";
    const showTitle = versions.length > 1;
    // Turn the raw body (which carries its own line breaks / numbered steps)
    // into readable paragraphs instead of one wall of text.
    const toParas = (body) => {
      if (!body) return "";
      return body.split(/\n{2,}/).map(blk => blk.trim()).filter(Boolean)
        .map(blk => `<p>${linkify(blk).replace(/\n/g, "<br>")}</p>`).join("");
    };
    const rows = versions.map(v => `
      <div class="version-row version-row--${esc(v.status)}">
        <div class="version-row__label">
          ${esc(v.label)}
          <span class="date">${esc(v.date)}</span>
          ${v.by ? `<span class="date">Cascaded by ${esc(v.by)}</span>` : ""}
        </div>
        <div class="version-row__body">
          ${showTitle && v.title && v.title !== v.body ? `<p class="version-row__heading">${esc(v.title)}</p>` : ""}
          ${toParas(v.body)}
        </div>
      </div>`).join("");
    return `<div class="version-block">${rows}</div>`;
  }

  /* ---------- Cascade cross-links (supersedes / superseded by) ---------- */
  // Resolve a cascade title to its detail link (needs the full cascade list).
  function cascadeLink(cascades, title) {
    const c = cascades.find(x => x.title === title);
    if (!c) return esc(title); // title not found -> show plain text, no broken link
    return `<a href="#/cascades/${esc(c.id)}">${esc(title)}</a>`;
  }

  // Shows on a cascade's detail page:
  //  - "Supersedes: <older title>" when this cascade replaces an older one
  //  - "Superseded by: <newer title>" when this cascade was replaced
  function supersedesBlock(c, cascades) {
    const parts = [];
    if (c.supersedes && c.supersedes.trim()) {
      parts.push(`<div class="supersede-row supersede-row--replaces">
        <span class="supersede-row__icon" aria-hidden="true">&#8593;</span>
        <span><b>Supersedes:</b> ${cascadeLink(cascades, c.supersedes.trim())}</span>
      </div>`);
    }
    if (c.supersededBy && c.supersededBy.trim()) {
      parts.push(`<div class="supersede-row supersede-row--replaced">
        <span class="supersede-row__icon" aria-hidden="true">&#8595;</span>
        <span><b>Superseded by:</b> ${cascadeLink(cascades, c.supersededBy.trim())}</span>
      </div>`);
    }
    return parts.length ? `<div class="supersede-block">${parts.join("")}</div>` : "";
  }

  // Inline superseded (older) cascade shown beneath the current one, so a CSR sees
  // the newer handling and the version it replaced in a single glance — no navigation.
  function supersededInline(c, cascades) {
    if (!c.supersededBy || !c.supersededBy.trim()) return "";
    const old = cascades.find(x => x.title === c.supersededBy.trim());
    if (!old) return "";
    return `<section class="section cascade-item__superseded">
      <h3 class="section__title">Superseded by this cascade</h3>
      <div class="supersede-old">
        <div class="supersede-old__head">
          <span class="supersede-old__title">${esc(old.title)}</span>
          ${statusChip(old.status)}
        </div>
        <div class="supersede-old__meta">${esc(old.category)} · Cascaded by ${esc(old.cascadedBy || "—")} · ${esc(old.date)}</div>
        <div class="version-block">${versionBlock(old.versions)}</div>
      </div>
    </section>`;
  }

  /* ---------- Resource card ---------- */
  function resourceCard(r) {
    const btn = r.url
      ? `<a class="btn btn--primary btn--sm rescard__btn" href="${esc(r.url)}" target="_blank" rel="noopener">Open Resource &nearr;</a>`
      : `<button class="btn btn--sm rescard__btn" disabled title="Link added in a later phase">Open Resource</button>`;
    return `<div class="card rescard">
      <div class="rescard__top">
        <span class="rescard__icon">&#128279;</span>
        <span class="rescard__name">${esc(r.name)}</span>
      </div>
      <div class="rescard__desc">${esc(r.desc)}</div>
      ${btn}
    </div>`;
  }

  /* ---------- Handbook card ---------- */
  function handbookCard(cat) {
    return `<a class="card card--link handcard" href="#/handbook">
      <span class="handcard__icon">${cat.icon}</span>
      <span class="handcard__title">${esc(cat.name)}</span>
      <span class="handcard__count">${cat.count} item${cat.count === 1 ? "" : "s"}</span>
      <span class="handcard__go">View &rarr;</span>
    </a>`;
  }

  /* ---------- Team card ---------- */
  function teamCard(m) {
    return `<div class="card teamcard">
      <div class="teamcard__photo"><span class="teamcard__initials">${esc(m.initials)}</span></div>
      <div class="teamcard__body">
        <div class="teamcard__name">${esc(m.name)}</div>
        <div class="teamcard__role">${esc(m.role)}</div>
        <div class="teamcard__team">${esc(m.team)}</div>
        <div class="teamcard__resp">${esc(m.resp)}</div>
      </div>
    </div>`;
  }

  // Escape text, then turn bare http(s):// URLs into clickable links (safe:
  // text is escaped first, so only genuinely-safe URL chars become anchors).
  function linkify(text) {
    const safe = esc(text);
    return safe.replace(/(https?:\/\/[^\s<>"']+)/g,
      (u) => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`);
  }

  /* ---------- Related item (detail sidebars) ---------- */
  function relatedItem(title, meta, href) {
    return `<a class="related-item" href="${esc(href)}">
      <span class="related-item__title">${esc(title)}</span>
      <span class="related-item__meta">${esc(meta)}</span>
    </a>`;
  }

  return {
    esc, brandMark, pageHead, notice, emptyState,
    statusChip, statusLegend, statusMeta, STATUS_META,
    navCard, catCard, productCard, productPlaceholder, cascadeItem,
    versionBlock, supersedesBlock, cascadeLink, supersededInline, cascadeImg, linkify,
    resourceCard, handbookCard, teamCard, relatedItem
  };
})();
