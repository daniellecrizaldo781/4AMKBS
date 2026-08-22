/* =====================================================================
   4AM MEDIA KNOWLEDGE BASE — DATA LAYER (Phase 1 placeholders)
   --------------------------------------------------------------------
   All UI is generated from this data. Replace the placeholder values
   with real content later (or swap this file for a fetch() of a JSON
   file) without touching any page/component code.
   ===================================================================== */

window.KB = (function () {
  "use strict";

  /* ----------------------------- PRODUCTS ----------------------------- */
  // Real product data comes from window.KB_RAW_PRODUCTS (products-data.js),
  // built by the sync-products.yml auto-sync from the live product sheet.
  // Falls back to a small placeholder list only if the sync hasn't run yet.
  const placeholderProducts = [
    { slug: "splash-foaming-cleaner", name: "Splash Foaming Cleaner", category: "Cleaning",  group: "cleaning", image: null }
  ];
  const products = (typeof window.KB_RAW_PRODUCTS !== "undefined" && window.KB_RAW_PRODUCTS.length)
    ? window.KB_RAW_PRODUCTS
    : placeholderProducts;

  /* ----------------------------- CASCADES -----------------------------
     Real cascade data comes from window.KB_RAW_CASCADES (cascades-data.js),
     loaded + merged at the bottom of this file. The Phase-1 hand-built demo
     cascades were removed so only real, dated cascade data (Jan→Aug 2026) shows. */
  const cascades = [];

  /* ----------------------------- RESOURCES ----------------------------- */
  const resourceCategories = [
    {
      name: "Team Tools", icon: "🛠",
      items: [
        { name: "Dashboards",          desc: "Team performance and operations dashboards.", url: null },
        { name: "Performance Tracker",  desc: "Track individual and team KPIs.",            url: null },
        { name: "Call Dashboard",       desc: "Live call volume and outcome metrics.",      url: null },
        { name: "Schedule",             desc: "Shift schedule and coverage view.",          url: null },
        { name: "Leave Request",        desc: "Submit and track time-off requests.",         url: null },
        { name: "OT Resources",         desc: "Overtime guidelines and request forms.",     url: null }
      ]
    },
    {
      name: "Customer Service Tools", icon: "💬",
      items: [
        { name: "Aircall",  desc: "Softphone / call handling platform.", url: null },
        { name: "Sticky",   desc: "Order management system.",            url: null },
        { name: "Gorgias",  desc: "Helpdesk and ticketing.",             url: null },
        { name: "Shopify",  desc: "Storefront and order backend.",       url: null },
        { name: "ShipHero", desc: "Warehouse and fulfillment.",          url: null }
      ]
    },
    {
      name: "Forms & Documents", icon: "📄",
      items: [
        { name: "Forms",            desc: "Internal request and intake forms.",  url: null },
        { name: "Google Sheets",    desc: "Shared trackers and logs.",           url: null },
        { name: "Google Documents", desc: "Policy and process documents.",        url: null },
        { name: "Request Forms",    desc: "Approval and escalation requests.",   url: null }
      ]
    },
    {
      name: "External Resources", icon: "🔗",
      items: [
        { name: "Important Links",      desc: "Key external portals and references.", url: null },
        { name: "Training Resources",   desc: "Onboarding and training material.",     url: null },
        { name: "Reference Websites",   desc: "Vendor and product reference sites.",   url: null }
      ]
    }
  ];

  /* ----------------------------- HANDBOOK ----------------------------- */
  const handbookCategories = [
    { name: "Attendance",               icon: "🕒", count: 3 },
    { name: "Scheduling",               icon: "📅", count: 2 },
    { name: "Overtime",                 icon: "⏱",  count: 2 },
    { name: "Leave / LWOP",             icon: "🌴", count: 4 },
    { name: "Performance",              icon: "📈", count: 3 },
    { name: "Productivity",             icon: "⚡", count: 2 },
    { name: "Quality Assurance",        icon: "✅", count: 5 },
    { name: "Call Handling",            icon: "📞", count: 4 },
    { name: "Customer Service Standards", icon: "⭐", count: 6 },
    { name: "Escalation Procedures",    icon: "🚩", count: 3 },
    { name: "Team Expectations",        icon: "🤝", count: 3 }
  ];

  /* ------------------------------- TEAM ------------------------------- */
  // Placeholder teammates — no real personal data.
  const team = [
    { name: "Team Lead — CS",        initials: "TL", role: "Customer Service Lead",   team: "Customer Service", resp: "Owns escalation approvals and daily coverage." },
    { name: "CS Representative",      initials: "CS", role: "CSR",                     team: "Customer Service", resp: "Handles tickets, calls, and refunds." },
    { name: "CS Representative",      initials: "CS", role: "CSR",                     team: "Customer Service", resp: "Handles tickets, calls, and refunds." },
    { name: "Quality Specialist",     initials: "QA", role: "QA Analyst",              team: "Quality",           resp: "Reviews tickets and coaching." },
    { name: "Training Coordinator",  initials: "TR", role: "Training & Onboarding",    team: "Operations",        resp: "Runs onboarding and refresher training." },
    { name: "Operations Manager",     initials: "OM", role: "Operations Manager",      team: "Operations",        resp: "Owns process and tooling." },
    { name: "Product Specialist",     initials: "PS", role: "Product Support",         team: "Product",           resp: "Oricle and product-specific handling." },
    { name: "Escalations Lead",       initials: "EL", role: "Escalations Lead",        team: "Customer Service", resp: "Owns high-risk and marketplace escalations." }
  ];

  /* --------------------------- DASHBOARD QUICK --------------------------- */
  const latestUpdates = [
    { title: "Refund Handling Updated",   date: "Aug 14, 2026", category: "Refunds & Payments" },
    { title: "Address Hold Process Updated", date: "Aug 11, 2026", category: "Orders & Shipping" },
    { title: "New Product Handling — X-All", date: "Aug 15, 2026", category: "General CSR Handling" }
  ];

  const frequentlyUsed = [
    { title: "Return Policy",        target: "#/search?q=Return%20Policy" },
    { title: "OHA Troubleshooting",  target: "#/products/oricle-hearing-aids" },
    { title: "Refund Handling",      target: "#/cascades?cat=Refunds%20%26%20Payments" },
    { title: "Shipping Handling",    target: "#/cascades?cat=Orders%20%26%20Shipping" },
    { title: "Aircall",              target: "#/resources" },
    { title: "Sticky",               target: "#/resources" }
  ];

  /* -------------------- REAL CASCADES (from source docs) --------------------
     cascades-data.js sets window.KB_RAW_CASCADES = [all real entries merged
     from the two Google Docs]. The Phase-1 hand-built demo cascades (which
     invented placeholder content like "Refund Request Handling") were removed
     so the site only shows real, dated cascade data from Jan→Aug 2026.
     Categories are derived from the real data, not a fixed placeholder list. */
  cascades.push(...((typeof window.KB_RAW_CASCADES !== "undefined") ? window.KB_RAW_CASCADES : []));

  /* Derive the category list from the real cascades (newest first). */
  const cascadeCategories = Array.from(new Set(cascades.map(c => c.category)));

  return {
    products, cascades, cascadeCategories,
    resourceCategories, handbookCategories, team,
    latestUpdates, frequentlyUsed
  };
})();
