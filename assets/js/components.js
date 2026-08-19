/* =====================================================================
   4AM MEDIA KNOWLEDGE BASE — REUSABLE COMPONENTS
   Pure functions that return HTML strings. Reused across all pages.
   ===================================================================== */

window.KBComponents = (function () {
  "use strict";

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  /* ---------- Brand mark (inline SVG logo) ---------- */
  function brandMark(size) {
    size = size || 38;
    return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="4AM Media">
      <rect width="64" height="64" rx="14" fill="#0B2E59"/>
      <circle cx="32" cy="40" r="13" fill="#F2A900"/>
      <g stroke="#0B2E59" stroke-width="3.4" stroke-linecap="round">
        <line x1="32" y1="9" x2="32" y2="17"/>
        <line x1="13" y1="15" x2="18" y2="21"/>
        <line x1="51" y1="15" x2="46" y2="21"/>
        <line x1="7" y1="40" x2="15" y2="40"/>
        <line x1="49" y1="40" x2="57" y2="40"/>
      </g>
      <path d="M19 40 a13 13 0 0 1 26 0 Z" fill="#FFE9C2" opacity="0.85"/>
    </svg>`;
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

  /* ---------- Status badge ---------- */
  const STATUS_LABEL = { current: "CURRENT", updated: "UPDATED", previous: "PREVIOUS", outdated: "OUTDATED" };
  function statusBadge(status) {
    return `<span class="badge badge--${esc(status)}"><span class="status-dot status-dot--${esc(status)}"></span>${esc(STATUS_LABEL[status] || status)}</span>`;
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

  /* ---------- Cascade list item ---------- */
  function cascadeItem(c) {
    const tags = (c.tags || []).map(t => `<span class="pill pill--brand">${esc(t)}</span>`).join("");
    return `<a class="card card--link cascade-item" href="#/cascades/${esc(c.id)}">
      <div class="cascade-item__top">
        <span class="cascade-item__title">${esc(c.title)}</span>
        ${statusBadge(c.status)}
      </div>
      <div class="cascade-item__desc">${esc(c.desc)}</div>
      <div class="cascade-item__meta">
        <span><b>${esc(c.category)}</b></span>
        <span>${esc(c.product)}</span>
        <span>Updated ${esc(c.date)}</span>
      </div>
      ${tags ? `<div class="cascade-item__tags">${tags}</div>` : ""}
    </a>`;
  }

  /* ---------- Version history block (current vs previous) ---------- */
  function versionBlock(versions) {
    if (!versions || !versions.length) return "";
    const rows = versions.map(v => `
      <div class="version-row version-row--${esc(v.status)}">
        <div class="version-row__label">
          ${esc(v.label)}
          <span class="date">${esc(v.date)}</span>
        </div>
        <div class="version-row__body"><p>${esc(v.body)}</p></div>
      </div>`).join("");
    return `<div class="version-block">${rows}</div>`;
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

  /* ---------- Related item (detail sidebars) ---------- */
  function relatedItem(title, meta, href) {
    return `<a class="related-item" href="${esc(href)}">
      <span class="related-item__title">${esc(title)}</span>
      <span class="related-item__meta">${esc(meta)}</span>
    </a>`;
  }

  return {
    esc, brandMark, pageHead, notice, emptyState, statusBadge,
    navCard, catCard, productCard, productPlaceholder, cascadeItem,
    versionBlock, resourceCard, handbookCard, teamCard, relatedItem, STATUS_LABEL
  };
})();
