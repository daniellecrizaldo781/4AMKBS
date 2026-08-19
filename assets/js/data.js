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
  // category values map to a CSS modifier for the placeholder art color.
  const products = [
    { slug: "splash-foaming-cleaner", name: "Splash Foaming Cleaner", category: "Cleaning",  group: "cleaning", image: null },
    { slug: "splash-foam-spray",      name: "Splash Foam Spray",       category: "Cleaning",  group: "cleaning", image: null },
    { slug: "splash-spotless",        name: "Splash Spotless",         category: "Cleaning",  group: "cleaning", image: null },
    { slug: "splash-rinse",           name: "Splash Rinse",            category: "Cleaning",  group: "cleaning", image: null },
    { slug: "glabrous-skin",          name: "Glabrous Skin",           category: "Personal Care", group: "care", image: null },
    { slug: "best-breath",            name: "Best Breath",             category: "Personal Care", group: "care", image: null },
    { slug: "oricle-hearing-aids",    name: "Oricle Hearing Aids",     category: "Hearing",   group: "hearing", image: null },
    { slug: "klean-ears",             name: "Klean Ears",             category: "Dental",    group: "dental", image: null },
    { slug: "denta-blast",            name: "Denta Blast",             category: "Dental",    group: "dental", image: null },
    { slug: "pee-buster",             name: "Pee Buster",             category: "Pet",       group: "pet", image: null },
    { slug: "barks-no-more",          name: "Barks No More",          category: "Pet",       group: "pet", image: null },
    { slug: "x-all",                  name: "X-All",                  category: "Other",     group: "other", image: null }
  ];

  /* ----------------------------- CASCADES ----------------------------- */
  // status: current | updated | previous | outdated
  // Each cascade may carry a `versions` array to demonstrate the
  // current-vs-previous handling history (CURRENT / UPDATED / PREVIOUS / OUTDATED).
  const cascades = [
    {
      id: "refund-request",
      title: "Refund Request Handling",
      category: "Refunds & Payments",
      product: "All Products",
      date: "August 14, 2026",
      status: "current",
      desc: "Approved current handling for processing customer refund requests across all product lines.",
      tags: ["Refund", "Payments", "All Products"],
      relatedResources: ["Return Policy", "Shopify", "ShipHero"],
      relatedProducts: [],
      versions: [
        { status: "current",  label: "CURRENT",  date: "August 14, 2026",
          body: "Process refunds through Shopify within 24 business hours. Confirm the original payment method, verify the order is within the 30-day window, and apply the standard refund macro. Never issue store credit unless the customer explicitly requests it." },
        { status: "updated",  label: "UPDATED",  date: "July 02, 2026",
          body: "Refund window extended from 14 to 30 days. Updated macro now references the new window. Customers outside the window route to Escalations." },
        { status: "previous", label: "PREVIOUS", date: "May 19, 2026",
          body: "Refunds processed only after return tracking showed delivered. 14-day window. Manual review required for orders over $150." },
        { status: "outdated", label: "OUTDATED", date: "March 03, 2026",
          body: "Refunds issued as store credit by default. No payment-method verification step. (Superseded — do not use.)" }
      ]
    },
    {
      id: "address-hold",
      title: "Address Hold Process",
      category: "Orders & Shipping",
      product: "All Products",
      date: "August 11, 2026",
      status: "updated",
      desc: "How to place and release a hold on an order when a customer reports a wrong or incomplete shipping address.",
      tags: ["Shipping", "Address", "Hold"],
      relatedResources: ["ShipHero", "Sticky"],
      relatedProducts: [],
      versions: [
        { status: "updated",  label: "UPDATED",  date: "August 11, 2026",
          body: "Place an Address Hold in ShipHero and contact the customer via the address-verification macro. Release the hold only after the corrected address is confirmed in writing." },
        { status: "previous", label: "PREVIOUS", date: "June 04, 2026",
          body: "Cancel and recreate the order with the corrected address. Refund the original, charge the new. (Heavier flow — replaced by the hold-and-edit method.)" }
      ]
    },
    {
      id: "oricle-battery",
      title: "Battery Draining Quickly",
      category: "OHA / Hearing Aids",
      product: "Oricle Hearing Aids",
      date: "August 09, 2026",
      status: "current",
      desc: "Troubleshooting and approved handling when an Oricle customer reports the battery drains faster than expected.",
      tags: ["Oricle", "Battery", "Troubleshooting"],
      relatedResources: ["Gorgias", "Return Policy"],
      relatedProducts: ["oricle-hearing-aids"],
      versions: [
        { status: "current", label: "CURRENT", date: "August 09, 2026",
          body: "Confirm the customer is using the supplied zinc-air batteries and has removed the sticker tab. Short battery life is often the tab left on, or frequent Bluetooth streaming. Offer the battery-saving macro; replace under warranty if within 12 months." }
      ]
    },
    {
      id: "oricle-double-dome",
      title: "OHA Double Dome Tips Fit & Insertion",
      category: "OHA / Hearing Aids",
      product: "Oricle Hearing Aids",
      date: "August 18, 2026",
      status: "current",
      desc: "Updated guidance on fitting and inserting the double dome tips for Oricle hearing aids.",
      tags: ["Oricle", "Dome Tips", "Fitting"],
      relatedResources: ["Audiologist Portal"],
      relatedProducts: ["oricle-hearing-aids"],
      versions: [
        { status: "current", label: "CURRENT", date: "August 18, 2026",
          body: "Use the double dome for customers with moderate loss. Walk through insertion with the assisted-insertion script; document fit confirmation in the ticket." },
        { status: "previous", label: "PREVIOUS", date: "July 28, 2026",
          body: "Single dome defaulted. Double dome offered only on escalation. (Replaced — double dome is now standard where appropriate.)" }
      ]
    },
    {
      id: "new-product-handling",
      title: "New Product Handling — X-All",
      category: "General CSR Handling",
      product: "X-All",
      date: "August 15, 2026",
      status: "current",
      desc: "Intake and handling notes for the new X-All product line.",
      tags: ["X-All", "New Product", "Intake"],
      relatedResources: ["Product Sheet — X-All"],
      relatedProducts: ["x-all"],
      versions: [
        { status: "current", label: "CURRENT", date: "August 15, 2026",
          body: "X-All is treated as a general-wellness item. Standard 30-day handling applies. No medical claims may be made to the customer." }
      ]
    },
    {
      id: "international-returns",
      title: "International Returns",
      category: "Returns",
      product: "All Products",
      date: "August 12, 2026",
      status: "current",
      desc: "Handling returns for customers outside the domestic shipping region.",
      tags: ["Returns", "International"],
      relatedResources: ["Return Policy", "ShipHero"],
      relatedProducts: [],
      versions: [
        { status: "current", label: "CURRENT", date: "August 12, 2026",
          body: "Offer a partial refund or reshment where return shipping is cost-prohibitive. Document the reason and route amounts over $75 to Escalations." }
      ]
    },
    {
      id: "sticky-page-error",
      title: "Sticky Page Error — Temporary Workaround",
      category: "Orders & Shipping",
      product: "All Products",
      date: "June 13, 2026",
      status: "updated",
      desc: "Workaround for the known Sticky page error when creating or editing orders.",
      tags: ["Sticky", "Order Management", "Workaround"],
      relatedResources: ["Sticky", "Internal Notes"],
      relatedProducts: [],
      versions: [
        { status: "updated",  label: "UPDATED",  date: "June 13, 2026",
          body: "Clear cache and retry; if the error persists, create the order via ShipHero directly and log the ticket ID in Internal Notes." },
        { status: "previous", label: "PREVIOUS", date: "April 22, 2026",
          body: "Wait 15 minutes and retry. No ShipHero fallback documented. (Replaced by the direct-creation workaround.)" }
      ]
    },
    {
      id: "warranty-replacement",
      title: "Warranty Replacement Process",
      category: "Returns",
      product: "All Products",
      date: "August 14, 2026",
      status: "current",
      desc: "When and how to approve a warranty replacement instead of a refund.",
      tags: ["Warranty", "Replacement"],
      relatedResources: ["Return Policy"],
      relatedProducts: [],
      versions: [
        { status: "current", label: "CURRENT", date: "August 14, 2026",
          body: "Approve replacement for defects within the warranty period. Capture photo evidence where possible and use the warranty macro. Defective unit not required to be returned for items under $40." }
      ]
    },
    {
      id: "marketplace-no-direct",
      title: "Do Not Assist Marketplace Customers Directly",
      category: "Sales & Offers",
      product: "All Products",
      date: "July 25, 2026",
      status: "current",
      desc: "Reminder that Amazon/Walmart/eBay orders are handled by the marketplace team, not CSRs.",
      tags: ["Marketplace", "Amazon", "Walmart"],
      relatedResources: ["Marketplace Escalation"],
      relatedProducts: [],
      versions: [
        { status: "current", label: "CURRENT", date: "July 25, 2026",
          body: "Redirect marketplace customers to the marketplace's own support. Do not modify, refund, or cancel marketplace orders from Shopify." }
      ]
    },
    {
      id: "marketing-unsubscribe",
      title: "Marketing Email Unsubscribe Requests",
      category: "General CSR Handling",
      product: "All Products",
      date: "June 19, 2026",
      status: "current",
      desc: "Processing a customer's request to stop marketing emails.",
      tags: ["Marketing", "Unsubscribe", "Email"],
      relatedResources: ["Email Preference Center"],
      relatedProducts: [],
      versions: [
        { status: "current", label: "CURRENT", date: "June 19, 2026",
          body: "Honor unsubscribe requests immediately via the preference center. Transactional emails (order/shipping) still send. Log the request reason if volunteered." }
      ]
    }
  ];

  /* --------------------------- CASCADE CATEGORIES --------------------------- */
  const cascadeCategories = [
    "Latest Updates", "Handling Updates", "Orders & Shipping", "Refunds & Payments",
    "Returns", "OHA / Hearing Aids", "Splash Products", "Dental Products", "Pet Products",
    "Sales & Offers", "Escalations", "General CSR Handling"
  ];

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

  /* -------------------- REAL CASCADES (from source doc) --------------------
     cascades-data.js sets window.KB_RAW_CASCADES = [121 real entries].
     We prefer those over the placeholders, but keep the hand-built demo
     entries (which include an OUTDATED layer) so the versioning showcase
     still has an example with all four statuses. */
  const realCascades = (typeof window.KB_RAW_CASCADES !== "undefined") ? window.KB_RAW_CASCADES : [];
  const demoIds = new Set(cascades.map(c => c.id));
  const mergedCascades = cascades.concat(realCascades.filter(c => !demoIds.has(c.id)));

  return {
    products, cascades: mergedCascades, cascadeCategories,
    resourceCategories, handbookCategories, team,
    latestUpdates, frequentlyUsed
  };
})();
