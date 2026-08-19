// REFUND HANDLING CASCADE — sourced from the live Google Doc
// (docs.google.com/document/d/139FanVB1D07-zdVhei7suQtIaHyL7ihLs3bz9pQuluw).
// Each entry below shows its ENTIRE handling text. The cascade is versioned:
// CURRENT (newest, follow this) -> UPDATED -> PREVIOUS (kept for reference only).
window.KB_RAW_CASCADES = [
  {
    id: "refund-flow-test-oricle",
    title: "Refund Flow Test — Oricle Hearing Aid",
    desc: "Refund pushback flow test for approved Oricle refunds; email-only, US single-unit customers.",
    category: "Refunds & Payments",
    product: "Oricle Hearing Aids",
    status: "current",
    date: "January 24, 2026",
    cascadedBy: "CSR Leadership",
    tags: ["refund", "pushback", "oricle", "email-only", "US"],
    versions: [
      {
        status: "current",
        label: "CURRENT",
        date: "January 24, 2026",
        by: "CSR Leadership",
        title: "Update: Oricle Hearing | Refund Flow Test Update",
        body: "Effective immediately, please pause sending the refund request link.\n\nFor now, let’s revert to our standard return process, which includes:\n* Providing the return address\n* Sharing a clear and accurate refund breakdown\n* Issuing the refund directly\n\nAdditionally, please assign the ticket to me if a customer is:\n* Questioning or complaining about refunds already issued (based on the refund form)\n* Looking for the mentioned return label\n* Asking about the promised store credit"
      },
      {
        status: "updated",
        label: "UPDATED",
        date: "January 23, 2026",
        by: "CSR Leadership",
        title: "Update: Refund Flow Test | Oricle Hearing | EMAIL ONLY",
        body: "Here’s a quick update regarding the refund flow test:\n* Do NOT send the refund request link to customers who purchased Oricle Hearing – Pro Version at $149.98. Only those who purchased it at $189.99 are eligible for the test.\n* Do NOT send the refund request link to customers with refundable add-on items (e.g., UV Sanitizer, Bonus Purchase), as these are not part of the offer yet.\nPlease follow these guidelines carefully to maintain consistency in handling."
      },
      {
        status: "previous",
        label: "PREVIOUS",
        date: "January 21, 2026",
        by: "CSR Leadership",
        title: "Refund Flow Test: Oricle Hearing Aid",
        body: "We’re running a test for an additional refund pushback flow via our website. Here’s what you need to know:\n* This applies only to customers who have been approved for a refund after going through the refund pushback process (after troubleshooting, BTE offer declined, and still eligible for the return).\n* Only customers who ordered a single unit are included in this test.\n* After usual pushback handling, send the customer this link to manage their refund: (LINK NO LONGER AVAILABLE)\n* Do NOT process any refunds on our end.\n* Paste all tickets into the OHA - Refund Pushback Tagging - Refund Requests (Test) Tab. Customer responses will be reviewed, and next steps will be shared.\nImportant Reminders: This applies to Email only and for US customers. International orders will be handled through the usual process.\n\nMacro to Use (modify as needed):\nHi Customer,\n\nWe completely understand if the upgrade isn't the right fit for you and you'd prefer to proceed with the return instead.\n\nTo manage and continue with your refund, please complete the form using the link below:(LINK NO LONGER AVAILABLE)\n\nOnce the form is submitted, our team will review the details and proceed accordingly.\n\nShould you need any further assistance or have questions along the way, please don't hesitate to reach out—we're happy to help.\n\nBest regards,\nMary Hudson, Customer Service Representative\nOricle Hearing LLC"
      }
    ]
  }
];
