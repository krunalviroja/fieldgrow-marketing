export const brand = {
  name: "FieldGrow",
  tagline: "Run your field team. Get more customers. Get paid faster. Bring customers back.",
  promise: "The Business Operating System for Field Service Businesses",
  usp: "Service-to-Growth Engine™",
  email: "hello@fieldgrow.app",
  phone: "+91 98765 43210",
};

export const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#growth-loop", label: "Growth Loop" },
  { href: "#problems", label: "Problems We Solve" },
  { href: "#industries", label: "Industries" },
  { href: "#resources", label: "Resources" },
];

export const heroStats = [
  { label: "Jobs completed loop", value: "1 → ∞" },
  { label: "Missed revenue surfaced", value: "₹1.5L+" },
  { label: "Channels unified", value: "WhatsApp + Web" },
];

export const problems = [
  {
    title: "Owner doesn't know what's happening",
    pain: "Customers ask where the technician is. You call Rahul. Rahul forgot the customer name.",
    fix: "Live job board with status, ETA, and map tracking for every technician.",
  },
  {
    title: "Jobs get lost in WhatsApp",
    pain: "A customer messages “AC service required.” Someone replies “Okay sir.” Then… forgotten.",
    fix: "Every enquiry becomes a tracked lead → booking → job → invoice.",
  },
  {
    title: "Business knowledge walks out the door",
    pain: "When an employee leaves, customer history, machine details, and invoices leave too.",
    fix: "Customer 360 keeps jobs, assets, photos, payments, and AMC in one place.",
  },
  {
    title: "Repeat revenue quietly disappears",
    pain: "Six months after a service, nobody follows up. That customer never returns.",
    fix: "Missed Revenue engine flags due services, AMC renewals, and stale quotations.",
  },
  {
    title: "Cash and profit are fuzzy",
    pain: "You see revenue. You don't see parts, travel, commission, or true job profit.",
    fix: "Job Profitability and payment trails remove cash leakage and guesswork.",
  },
  {
    title: "The owner becomes the operating system",
    pain: "Sunday off feels impossible because every call, invoice, and spare part needs you.",
    fix: "FieldGrow becomes the system of record so the business can run without chaos.",
  },
];

export const growthSteps = [
  { id: "booking", label: "Booking", detail: "Website / WhatsApp / call becomes a confirmed job." },
  { id: "job", label: "Job", detail: "Dispatch, navigate, checklist, photos, signature." },
  { id: "invoice", label: "Invoice & Pay", detail: "Collect payment on-site. Zero ambiguity." },
  { id: "review", label: "Review", detail: "Ask for Google review while the customer is happiest." },
  { id: "ai", label: "AI Growth", detail: "Social posts, next-best offer, and reminder campaigns." },
  { id: "repeat", label: "Repeat Revenue", detail: "AMC packages and auto reminders bring them back." },
];

export const industries = [
  { name: "AC / HVAC / Appliances", focus: "AMC, seasonal demand, before/after proof" },
  { name: "CCTV / Security / Networking", focus: "Install + maintenance + recurring contracts" },
  { name: "Pest Control / Cleaning", focus: "Routes, packages, review-driven acquisition" },
  { name: "Electrical / Plumbing", focus: "Emergency jobs, quotations, first-time fix" },
];

export const experienceTabs = [
  {
    id: "social",
    label: "1-Click Social Posts",
    blurb: "Turn a finished job into Instagram/WhatsApp creatives instantly.",
  },
  {
    id: "website",
    label: "Website Deploy",
    blurb: "Pick a template, preview your brand site, deploy to a custom domain.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Booking",
    blurb: "Simulate the Indian-native booking flow from chat to technician.",
  },
  {
    id: "revenue",
    label: "Missed Revenue",
    blurb: "See hidden opportunities and take action in one click.",
  },
  {
    id: "customer360",
    label: "Customer 360",
    blurb: "Know the next best action for every customer — not just history.",
  },
  {
    id: "profit",
    label: "Job Profitability",
    blurb: "See real profit after parts, travel, and technician cost.",
  },
] as const;

export type ExperienceTabId = (typeof experienceTabs)[number]["id"];

export const comparisonRows = [
  { capability: "Operations", traditional: 5, fieldForce: 3, erp: 5, crm: 3, fieldgrow: 5 },
  { capability: "Field Force", traditional: 5, fieldForce: 5, erp: 2, crm: 2, fieldgrow: 5 },
  { capability: "Billing", traditional: 4, fieldForce: 2, erp: 5, crm: 2, fieldgrow: 4 },
  { capability: "Marketing / Growth", traditional: 1, fieldForce: 1, erp: 2, crm: 4, fieldgrow: 5 },
];

export const modules = {
  core: [
    "Admin web & mobile",
    "Technician app (offline-first)",
    "Scheduling & dispatch",
    "Google Maps & live tracking",
    "Invoices, payroll, expenses",
    "Service quality score",
  ],
  growth: [
    "Dynamic portfolio website",
    "WhatsApp-first booking",
    "Google review automation",
    "AI social content",
    "AMC & reactivation campaigns",
    "Missed Revenue engine",
  ],
};