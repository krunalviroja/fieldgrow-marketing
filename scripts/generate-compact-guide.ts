import { writeFileSync } from "node:fs";
import { join } from "node:path";
import PDFDocument from "pdfkit";

type Page = { title: string; kicker: string; intro?: string; blocks: Block[] };
type Block =
  | { kind: "text"; text: string; tone?: "normal" | "note" }
  | { kind: "bullets"; items: string[]; columns?: 1 | 2 }
  | { kind: "cards"; items: { title: string; text: string; status?: string }[]; columns?: 1 | 2 | 3 }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "flow"; items: string[] };

const root = process.cwd();
const outputName = "FieldGrow_Complete_Customer_Product_Guide.pdf";
const C = { ink: "#10231D", green: "#145A46", mint: "#DFF3E9", light: "#F2F8F4", paper: "#FBFDFB", line: "#CFE0D7", muted: "#587068", orange: "#F29A36", white: "#FFFFFF", charcoal: "#263532" };

const pages: Page[] = [
  { kicker: "FIELD SERVICE MANAGEMENT + BUSINESS GROWTH", title: "FieldGrow", blocks: [
    { kind: "text", text: "Run your field team. Get more customers. Get paid faster. Bring customers back.", tone: "note" },
    { kind: "text", text: "A connected operating platform for customer management, quotations, bookings, field operations, billing, retention and repeat revenue." },
    { kind: "cards", columns: 2, items: [
      { title: "The promise", text: "Make the work visible, the payment trail clear and the next customer action easier to take." },
      { title: "The lifecycle", text: "Customer → Quotation → Booking → Job → Technician → Invoice → Payment → Retention → Repeat booking." },
    ] },
    { kind: "text", text: "Customer Product Guide  •  Version 1.0  •  3 November 2026\nhttps://fieldgrow-marketing.vercel.app/\nhello@fieldgrow.app  •  +91 98765 43210" },
  ] },
  { kicker: "01 / PRODUCT OVERVIEW", title: "Executive Summary", blocks: [
    { kind: "text", text: "FieldGrow is positioned as a Field Service Management and Business Growth Platform for service businesses. It connects customer records, quotations, bookings, technician work, job completion, invoices, collections, feedback and repeat-service opportunities in one operating model." },
    { kind: "cards", columns: 3, items: [
      { title: "Run the work", text: "See jobs, assign technicians, document service and monitor exceptions. Status: Planned; dashboard previews are Demonstration Only." },
      { title: "Protect the cash", text: "Connect completed work to invoices, payments, expenses and direct job costs. Profit calculator: Demonstration Only." },
      { title: "Grow the relationship", text: "Use service history for reviews, reminders, AMC renewals and relevant repeat bookings. Messaging integrations: Integration Required." },
    ] },
    { kind: "flow", items: ["Customer", "Quotation", "Booking", "Field operations", "Invoice", "Payment", "Retention", "Repeat revenue"] },
    { kind: "text", text: "Accuracy note: the reviewed website is a marketing site with local sample demonstrations. Production accounts, database persistence, payment gateways, live maps, inventory transactions and technician apps require confirmation." , tone: "note" },
  ] },
  { kicker: "02 / BUSINESS VALUE", title: "Challenges and Solutions", blocks: [
    { kind: "table", headers: ["Challenge", "FieldGrow approach", "Business benefit"], rows: [
      ["Poor technician/job visibility", "Shared job statuses, daily overview and dispatch model; maps need integration.", "Fewer status calls; clearer commitments."],
      ["Customer data in chats and sheets", "Customer 360 with addresses, assets, history and documents.", "Continuity when staff change."],
      ["Manual scheduling and coordination", "Availability, skills, workload and reassignment workflow.", "Fewer avoidable conflicts."],
      ["Quotes and AMC dates forgotten", "Pending quotation review, maintenance reminders and renewal actions.", "More timely customer conversations."],
      ["Payment and profit unclear", "Invoice/payment trail and direct-cost calculation.", "Better collection and pricing decisions."],
      ["Reports assembled manually", "Defined customer, job, finance, retention and opportunity reports.", "Faster business reviews."],
    ] },
    { kind: "text", text: "Inventory visibility, complaint SLAs, branch permissions, payroll and automatic follow-up are requested capabilities and must be verified before being promised. Status: Planned unless stated otherwise.", tone: "note" },
  ] },
  { kicker: "03 / CUSTOMER FOUNDATION", title: "Customer and Service Management", blocks: [
    { kind: "cards", columns: 2, items: [
      { title: "Customer 360", text: "Profiles, contact details, multiple service addresses, assets, previous jobs, quotations, invoices, payments, complaints, feedback, AMC status, lifetime revenue and a Next Best Action. Current sample card: Demonstration Only." },
      { title: "Service catalogue", text: "Categories, subcategories, packages, labour/material charges, fixed or inspection pricing, duration, skill requirements and custom service configuration. Real catalogue editing: Planned." },
      { title: "Service history", text: "Attach work, photos, notes and outcomes to the customer and relevant asset so knowledge remains with the business." },
      { title: "Business benefit", text: "A service team can answer what was done, what was paid and what may be due next without depending on one employee's memory." },
    ] },
    { kind: "flow", items: ["Find customer", "Confirm address/asset", "Review history", "Define service", "Set next action"] },
    { kind: "text", text: "Availability: the website provides a working sample Customer 360 interaction and configurable industry data. Persistent records, computed totals and offer delivery require production implementation; sending an offer is Integration Required." },
  ] },
  { kicker: "04 / COMMERCIAL INTAKE", title: "Quotations and Bookings", blocks: [
    { kind: "cards", columns: 2, items: [
      { title: "Quotation management", text: "Create a proposed scope, service/product items, labour and material calculations, taxes/discounts where supported, revisions, approval/rejection, PDF sharing and pending reminders. Status: Planned." },
      { title: "Booking management", text: "Handle customer service requests, online or WhatsApp-style booking, appointment slots, confirmations, rescheduling, cancellation and recurring visits. Demo slot choices: Demonstration Only." },
      { title: "Customer decision", text: "Keep the approved quotation version, agreed scope, address, appointment window and customer communication together." },
      { title: "Business benefit", text: "Fewer scope disputes, clearer appointment promises and a documented path from an approved estimate to a job." },
    ] },
    { kind: "flow", items: ["Service request", "Prepare quote", "Customer approves", "Select slot", "Confirm booking"] },
    { kind: "text", text: "Actual quotation persistence, customer approval, appointment capacity and communication delivery were not verified in the reviewed code. WhatsApp, email/SMS and payment messaging are Integration Required." , tone: "note" },
  ] },
  { kicker: "05 / FIELD OPERATIONS", title: "Jobs, Scheduling and Dispatch", blocks: [
    { kind: "cards", columns: 2, items: [
      { title: "Work orders", text: "Turn a booking into executable instructions: customer/address, scope, assigned person, forms, checklist, materials, evidence, signature, outcome and costs. Status: Planned." },
      { title: "Smart scheduling", text: "Consider technician availability, skill requirements, workload, visit duration and travel. Reassignment and delayed-job alerts are requested workflows." },
      { title: "Maps and ETA", text: "Google Maps, route planning, technician location and arrival estimates need external mapping/location services. Status: Integration Required." },
      { title: "Job visibility", text: "The intended command center distinguishes upcoming, active, delayed, waiting and completed work. Current dashboard artwork is Demonstration Only." },
    ] },
    { kind: "flow", items: ["Confirmed booking", "Create work order", "Check skills/capacity", "Assign technician", "Monitor status", "Resolve exception"] },
    { kind: "text", text: "Business benefit: the office can coordinate work around a shared record instead of repeating changes across private chats. A map pin is not a guaranteed ETA; device permission, connectivity and provider setup matter." },
  ] },
  { kicker: "06 / FIELD TEAM EXPERIENCE", title: "Technician Application", blocks: [
    { kind: "cards", columns: 3, items: [
      { title: "See", text: "Dashboard, today's jobs, assigned visits, customer details and navigation. Status: Planned." },
      { title: "Do", text: "Accept/update job status, complete checklists, capture before/after photos and record material usage." },
      { title: "Close", text: "Capture customer signature, payment collection, completion report and synchronization status." },
    ] },
    { kind: "flow", items: ["Assigned job", "Navigate", "Arrive", "Checklist + photos", "Materials", "Signature", "Payment", "Sync"] },
    { kind: "text", text: "Offline-first operation is part of the product direction: today's jobs and work evidence should remain usable in weak-network locations, then sync later. An installed Android/iOS app, offline coverage, conflict rules and sync service were not verified. Status: Planned." },
    { kind: "text", text: "Business benefit: technicians spend less time calling for details and the business retains consistent evidence of the work. Customer information access should be limited to what the technician needs; permissions require confirmation.", tone: "note" },
  ] },
  { kicker: "07 / STOCK + MONEY", title: "Inventory and Finance", blocks: [
    { kind: "table", headers: ["Area", "Requested capability", "Status"], rows: [
      ["Inventory", "Product catalogue, warehouse and technician stock, transfers, consumption, purchase orders, suppliers, low-stock alerts and returns.", "Planned — not verified"],
      ["Invoices", "Invoice generation, itemized charges, GST-related configuration and receipts.", "Planned — verify with accountant"],
      ["Payments", "Cash, partial payments, UPI/online payment, outstanding balances and reconciliation.", "Integration Required for gateways"],
      ["Expenses/payroll", "Expense records and payroll-related workflows.", "Planned; statutory payroll unverified"],
      ["Profitability", "Payment/revenue minus parts, technician cost, travel and commission.", "Demonstration Only calculator"],
    ] },
    { kind: "text", text: "The working job-profit demo calculates ₹5,000 − ₹1,200 parts − ₹700 technician − ₹250 travel − ₹300 commission = ₹2,550 estimated direct profit, or 51% margin. It excludes unentered overheads and tax effects; it is not an accounting control." },
    { kind: "text", text: "Recommended finance chain: completed job → approved charges → invoice → payment allocation → receipt → reconciliation → cost review.", tone: "note" },
  ] },
  { kicker: "08 / SERVICE CONTINUITY", title: "AMC and Service Quality", blocks: [
    { kind: "cards", columns: 2, items: [
      { title: "AMC and maintenance", text: "Create contracts, link covered assets, schedule recurring visits, track contract payments, prepare renewal reminders and manage warranty terms where supported. Status: Planned; due-renewal cards are Demonstration Only." },
      { title: "Complaints and rework", text: "Register and assign complaints, track response targets, escalate, detect repeat issues, record rework and capture satisfaction. Status: Planned; SLA rules unverified." },
      { title: "Service quality", text: "Use punctuality, checklist completion, customer rating, first-time fix and complaint recurrence as quality signals. Formula and live report require confirmation." },
      { title: "Business benefit", text: "The team can distinguish a successful first visit from unresolved work and can review a renewal before a customer becomes inactive." },
    ] },
    { kind: "flow", items: ["Complete service", "Record outcome", "Set next date", "Review feedback", "Renew or rework"] },
  ] },
  { kicker: "09 / CORE DIFFERENTIATOR", title: "Service-to-Growth Engine™", blocks: [
    { kind: "flow", items: ["Customer", "Quotation", "Booking", "Technician", "Service", "Invoice", "Payment", "Review", "Marketing", "Repeat booking"] },
    { kind: "text", text: "FieldGrow's central idea is simple: completed service work contains the context for the next relevant customer conversation. A review request, maintenance reminder, AMC renewal, reactivation message, referral or approved social post should come from service history—not from a disconnected broadcast list." },
    { kind: "cards", columns: 2, items: [
      { title: "AC example", text: "An Ahmedabad customer books a ₹999 AC service. The team documents the visit, invoices and records payment. The business then reviews feedback, notes an appropriate maintenance interval and may present an illustrative ₹1,999 annual package before the next due date." },
      { title: "Important boundary", text: "A reminder is not a booking; a booking is not collected revenue. Google reviews, automatic reminders, referrals and AI suggestions require production implementation and/or integration." },
    ] },
    { kind: "text", text: "The website's question is stronger than “Did the job finish?”: “What useful business can this completed job create next?” Results depend on service quality, customer consent, accurate data and follow-through.", tone: "note" },
  ] },
  { kicker: "10 / CUSTOMER-FACING GROWTH", title: "Growth and Marketing Features", blocks: [
    { kind: "table", headers: ["Feature", "What it should do", "Status"], rows: [
      ["Dynamic business website", "Brand, services, service areas, before/after work, genuine reviews, booking and custom domain where available.", "Demonstration Only preview; deployment integration required"],
      ["WhatsApp communication", "Booking, confirmation, reminders, assignment/arrival, completion, invoice, payment, review and AMC messages.", "Demonstration Only chat; Integration Required"],
      ["Google reputation", "Review links, feedback and reputation management after service.", "Integration Required"],
      ["AI-assisted social content", "Draft Instagram/WhatsApp content from a completed job and approved imagery.", "Demonstration Only template; real AI/publishing required"],
      ["Reactivation/referrals", "Segment existing customers, prepare renewal/repeat campaigns and attribute bookings.", "Planned / Integration Required"],
    ] },
    { kind: "text", text: "The current website demonstrates website template/domain inputs and a social caption generator. It does not register a domain, publish a site, send a message, post to a social account or guarantee a public review. Customer images require permission." },
  ] },
  { kicker: "11 / REVENUE OPPORTUNITIES", title: "Missed Revenue Engine™", blocks: [
    { kind: "cards", columns: 2, items: [
      { title: "What it highlights", text: "AMC renewals due, inactive existing customers, unaccepted quotations, maintenance due and pending customer follow-ups. The website uses fixed sample opportunities." },
      { title: "What the owner does", text: "Review eligibility, remove duplicates/unsuitable contacts, approve an offer, communicate through an enabled channel, book the service and compare actual collected work with campaign cost." },
    ] },
    { kind: "table", headers: ["Sample opportunity", "Illustrative value"], rows: [["12 AMC renewals due", "₹54,000"], ["8 customers have not returned", "₹31,500"], ["6 quotations not accepted", "₹42,000"], ["17 maintenance visits due", "₹28,000"], ["Sample total", "₹1,55,500"]] },
    { kind: "text", text: "Revenue Recovery Simulator: adjust technician count (3–40), monthly jobs (80–1,200) and average job value (₹800–₹8,000). The current formula uses fixed assumptions for reactivation, quotations and AMC. Its result is an illustrative estimate, not guaranteed revenue, profit or a campaign sent from the website.", tone: "note" },
  ] },
  { kicker: "12 / INTERACTIVE PRODUCT DEMOS", title: "Experience Lab", blocks: [
    { kind: "table", headers: ["Demo", "Visitor action and output", "Business value / boundary"], rows: [
      ["1-Click Social Posts", "Enter business, service and city; receive a template caption, hashtags and fixed before/after image.", "Shows a content starting point; no live AI or publishing."],
      ["Website Deployment", "Choose Trust Pro, Proof Gallery or Local Hero; enter a domain; inspect preview; press deploy.", "Shows online presence concept; no hosting, DNS, SSL or live deployment."],
      ["WhatsApp Booking", "Select Satellite and choose 10 AM, 1 PM or 6 PM; read sample assignment, invoice and review messages.", "Shows conversation flow; no real slot, job, payment or message."],
      ["Missed Revenue", "Press actions for renewal, reactivation, quotations or maintenance.", "Shows prioritized work; Queued is local demo state."],
      ["Customer 360", "Review sample metrics, assets and Next Best Action; press Send Offer.", "Shows decision surface; no persistent customer or WhatsApp message."],
      ["Job Profitability", "Enter payment, parts, technician, travel and commission; calculate.", "Shows direct-cost logic; no imported accounting data."],
    ] },
    { kind: "text", text: "All six demos run with sample/local state. The current Experience Lab does not implement a dedicated Reset button; reloading the page resets the session. Classification: Demonstration Only unless separately marked Configurable." },
  ] },
  { kicker: "13 / INDUSTRY FIT", title: "Industry Use Cases", blocks: [
    { kind: "table", headers: ["Industry", "Typical workflow", "Useful capabilities"], rows: [
      ["AC / HVAC / appliances", "Asset history → quote cleaning/repair → visit → evidence → invoice → AMC reminder.", "Assets, checklists, photos, direct costs, AMC."],
      ["CCTV / security / networking", "Inspect device/site → quote hardware + labour → skilled install/repair → test/sign-off.", "Assets, quotation revisions, skills, materials, maintenance."],
      ["Pest control", "Record treatment area → book visit → checklist → follow-up schedule.", "Recurring bookings, service history, feedback, packages."],
      ["Cleaning", "Define rooms/scope → schedule team → checklist/sign-off → repeat visit.", "Catalogue, duration, team scheduling, evidence."],
      ["Electrical", "Inspect fault → revise estimate if needed → repair → test → collect.", "Quotes, approvals, parts, job cost, rework."],
      ["Plumbing", "Record location/problem → inspect → authorize parts → repair → complaint/rework history.", "Dispatch, photos, materials, feedback."],
      ["Home services", "Customer/service address → catalogue → slot → skilled visit → retention.", "Customer 360, booking, reviews, repeat service."],
      ["Facilities maintenance", "Site/asset → planned work → assignment → completion → contract review.", "Assets, contracts, work orders, multi-site scope to verify."],
    ] },
    { kind: "text", text: "Industry configuration, compliance requirements, specialized checklists and production support must be confirmed for each business. The website's industry selector changes sample names, services, cities and package examples; it does not prove a vertical-specific production module." , tone: "note" },
  ] },
  { kicker: "14 / OPERATING MODEL", title: "User Roles and Responsibilities", blocks: [
    { kind: "table", headers: ["Role", "Primary responsibility in the lifecycle"], rows: [
      ["Business owner", "Approve services/prices; review jobs, cash, direct margin, renewals and exceptions."],
      ["Admin", "Maintain customers, addresses, documents, bookings, communications and records."],
      ["Branch manager", "Coordinate local work, workload and service-quality exceptions; branch permissions require verification."],
      ["Sales executive", "Clarify customer requests, prepare quotations and communicate scope/appointments."],
      ["Dispatcher", "Check availability/skills, assign jobs, monitor progress and rebalance work."],
      ["Technician", "Navigate, execute the agreed job, complete checklist, capture evidence, collect and sync."],
      ["Accountant", "Validate invoices/tax setup, allocate payments, reconcile cash and review expenses."],
      ["Inventory manager", "Issue, transfer, count, consume and return parts if the inventory module is released."],
      ["Customer", "Confirm scope/slot, approve quotation, receive service, pay and provide feedback."],
    ] },
    { kind: "text", text: "This is a recommended responsibility model, not a verified permission matrix. User invitations, role restrictions, branch isolation and customer portal access require confirmation. No production access control was verified in the reviewed code." },
  ] },
  { kicker: "15 / END-TO-END OPERATIONS", title: "Complete Business Workflows", blocks: [
    { kind: "flow", items: ["Customer request", "Customer record", "Quotation", "Approval", "Booking", "Job creation", "Technician assignment", "Service execution", "Completion", "Invoice", "Payment", "Feedback", "Retention", "Repeat booking"] },
    { kind: "cards", columns: 2, items: [
      { title: "Request → booking", text: "Confirm customer/address/asset → define scope → prepare quotation → record approval → select a valid appointment → create a work order." },
      { title: "Booking → completion", text: "Check skill and availability → assign → navigate → confirm scope → checklist/photos/materials/signature → submit completion." },
      { title: "Completion → payment", text: "Review approved charges → issue invoice → record payment method/collector → allocate partial balance if supported → receipt/reconciliation." },
      { title: "Feedback → repeat", text: "Ask for honest feedback → resolve issues → share review link if integrated → set next service date → review suitable reminder/AMC offer → new booking." },
    ] },
    { kind: "text", text: "Every arrow should preserve the customer, address, asset, agreed scope and responsible person. Actual persistence and automation are Planned or Integration Required; the diagram is the intended business model." },
  ] },
  { kicker: "16 / MONEY + RETENTION", title: "Payments and Retention Workflows", blocks: [
    { kind: "table", headers: ["Workflow", "Concise operating steps", "Status"], rows: [
      ["Payment collection", "Invoice → receive cash/UPI/online payment → record method, amount and collector → receipt → reconcile.", "Planned; gateway Integration Required"],
      ["Customer feedback", "Close job → ask service outcome → record concern or rating → assign resolution → review link where enabled.", "Planned / Integration Required"],
      ["Google review", "Share correct business link after an honest feedback request → respond professionally.", "Integration Required"],
      ["Repeat service", "Set interval → check history and unresolved issues → send relevant reminder → agree slot → new booking.", "Planned / Integration Required"],
      ["AMC renewal", "Review assets/coverage/expiry → prepare terms → customer approval → payment → recurring schedule.", "Planned"],
      ["Reactivation", "Review inactive existing customers → remove unsuitable contacts → approve message/offer → communicate → attribute completed work.", "Planned / Integration Required"],
    ] },
    { kind: "text", text: "A campaign message being delivered, a review being requested or an opportunity being displayed does not mean a customer booked or paid. Measure actual completed jobs and collections separately from potential value.", tone: "note" },
  ] },
  { kicker: "17 / MANAGEMENT VIEW", title: "Reports and Analytics", blocks: [
    { kind: "cards", columns: 2, items: [
      { title: "Operations", text: "Customer records; bookings; job status/completion; technician performance; first-time fix; customer satisfaction; service quality and rework." },
      { title: "Money", text: "Revenue billed/collected; outstanding balances; expenses; direct job profitability; payment methods and cash reconciliation." },
      { title: "Continuity", text: "Inventory movements and low stock; AMC renewals; maintenance due; repeat customer rate and retention." },
      { title: "Growth", text: "Campaign performance, completed-job follow-up and Missed Revenue opportunities. Attribution needs booking/payment linkage." },
    ] },
    { kind: "table", headers: ["Report question", "Definition to agree before rollout"], rows: [
      ["First-time fix", "Eligible completed jobs resolved without related rework within an agreed window."],
      ["Job profitability", "Revenue/payment basis minus explicitly defined direct costs; not automatically net profit."],
      ["Retention", "Returning customers divided by an agreed eligible customer cohort and period."],
      ["Campaign performance", "Customer segment/action connected to an actual booking, completed job and collected value."],
    ] },
    { kind: "text", text: "Operational reporting is Planned in the reviewed scope. The Revenue Recovery Simulator is Demonstration Only and uses fixed assumptions; it is not a live report or guarantee." },
  ] },
  { kicker: "18 / GETTING STARTED", title: "Customer Onboarding and FAQ", blocks: [
    { kind: "cards", columns: 2, items: [
      { title: "Onboarding checklist", text: "1 Business/branch setup → 2 staff and roles → 3 service catalogue → 4 clean customer import → 5 technician/device trial → 6 booking/job rules → 7 communication integration → 8 first supervised job → 9 invoice/payment test → 10 report review." },
      { title: "Migration", text: "Excel, Tally, Sheets, WhatsApp contacts and other systems are prospective sources. Map fields, review duplicates, validate a sample, reconcile counts and approve import. Current migration preview: Demonstration Only." },
    ] },
    { kind: "table", headers: ["Question", "Short answer"], rows: [
      ["Can I try the demos without signing up?", "Yes; they use sample/local state and do not create production records."],
      ["Is the technician app offline?", "Offline-first is part of the direction; installed app, device support and sync need verification."],
      ["Is WhatsApp connected?", "The chat is a Demonstration Only; real delivery needs provider setup and approved templates."],
      ["Are Maps, UPI and Google reviews live?", "No production connections were verified; each is Integration Required."],
      ["Is inventory/GST/payroll available?", "Requested scope is Planned; confirm released detail with the team/accountant."],
      ["Will the simulator recover its amount?", "No. It is an illustrative calculation, not guaranteed revenue or profit."],
      ["How do we start?", "Request a walkthrough with a service, sample customer, quotation and daily schedule."],
    ] },
  ] },
  { kicker: "19 / DECISION CHECK", title: "Product Checklist and Contact", blocks: [
    { kind: "table", headers: ["Capability", "Current classification"], rows: [
      ["Marketing website, navigation and document downloads", "Available"],
      ["Industry selector and demo inputs", "Configurable in current sandbox"],
      ["WhatsApp, Customer 360, Missed Revenue, website and social demos", "Demonstration Only"],
      ["Job profitability calculator and revenue simulator", "Demonstration Only"],
      ["Admin, customer records, quotations, bookings, jobs and reports", "Planned / verify"],
      ["Technician Android/iOS and offline sync", "Planned / verify"],
      ["Maps, WhatsApp, Google reviews, UPI/online payments", "Integration Required"],
      ["Inventory, GST, payroll, complaints/SLA and branch permissions", "Planned / verify"],
    ] },
    { kind: "cards", columns: 2, items: [
      { title: "Why FieldGrow", text: "It connects customer management, service operations, technician work, invoicing, payment visibility and retention instead of leaving the next customer action outside the service record." },
      { title: "Walkthrough request", text: "Website: https://fieldgrow-marketing.vercel.app/\nEmail: hello@fieldgrow.app\nPhone: +91 98765 43210" },
    ] },
    { kind: "text", text: "Glossary: Customer 360 = customer history and next action; AMC = Annual Maintenance Contract; work order = executable job instructions; ETA = estimated arrival; direct margin = job value less defined direct costs. Review the capability status with FieldGrow before using real customer data.", tone: "note" },
  ] },
];

function wrap(doc: PDFKit.PDFDocument, value: string, width: number) {
  return doc.heightOfString(value, { width, lineGap: 2 });
}

function drawPage(doc: PDFKit.PDFDocument, page: Page, pageNumber: number) {
  const width = doc.page.width - 96;
  const bottom = doc.page.height - 58;
  let y = pageNumber === 1 ? 94 : 76;
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.paper);
  doc.rect(0, 0, doc.page.width, 8).fill(C.green);
  doc.fillColor(C.muted).font("Guide").fontSize(7.5).text(`FIELDGROW  /  CUSTOMER PRODUCT GUIDE  /  ${pageNumber.toString().padStart(2, "0")}`, 48, 25, { width, lineBreak: false });
  doc.moveTo(48, 42).lineTo(48 + width, 42).lineWidth(.5).strokeColor(C.line).stroke();
  if (pageNumber === 1) {
    doc.rect(0, 0, doc.page.width, 210).fill(C.green);
    doc.fillColor(C.mint).font("GuideBold").fontSize(12).text(page.kicker, 48, 65, { width });
    doc.fillColor(C.white).font("GuideBold").fontSize(48).text(page.title, 48, 105);
    doc.fillColor(C.mint).font("Guide").fontSize(15).text(page.blocks[0].kind === "text" ? page.blocks[0].text : "", 48, 165, { width });
    y = 270;
  } else {
    doc.fillColor(C.green).font("GuideBold").fontSize(8).text(page.kicker, 48, y, { width });
    y += 18;
    doc.fillColor(C.ink).font("GuideBold").fontSize(25).text(page.title, 48, y, { width });
    y = doc.y + 14;
  }
  for (const block of page.blocks.slice(pageNumber === 1 ? 1 : 0)) {
    if (block.kind === "text") {
      doc.font("Guide").fontSize(block.tone === "note" ? 8.5 : 9.4);
      const h = wrap(doc, block.text, width) + 8;
      if (y + h > bottom) break;
      doc.fillColor(block.tone === "note" ? C.muted : C.charcoal).text(block.text, 48, y, { width, lineGap: 2 });
      y = doc.y + (block.tone === "note" ? 9 : 13);
    } else if (block.kind === "flow") {
      const cols = block.items.length > 8 ? 7 : block.items.length > 5 ? 4 : block.items.length;
      const gap = 5;
      const boxW = (width - gap * (cols - 1)) / cols;
      const rows = Math.ceil(block.items.length / cols);
      const boxH = block.items.length > 8 ? 38 : 44;
      if (y + rows * (boxH + 8) > bottom) break;
      block.items.forEach((item, i) => {
        const row = Math.floor(i / cols); const col = i % cols;
        const x = 48 + col * (boxW + gap); const top = y + row * (boxH + 8);
        doc.roundedRect(x, top, boxW, boxH, 5).fillAndStroke(C.mint, C.line);
        doc.fillColor(C.green).font("GuideBold").fontSize(7.2).text(item, x + 4, top + 13, { width: boxW - 8, align: "center" });
        if (col < cols - 1 && i < block.items.length - 1) doc.fillColor(C.orange).font("GuideBold").fontSize(10).text("→", x + boxW + 1, top + 14);
      });
      y += rows * (boxH + 8) + 12;
    } else if (block.kind === "bullets") {
      const cols = block.columns ?? 1; const colW = (width - 14 * (cols - 1)) / cols; const maxRows = Math.ceil(block.items.length / cols);
      const heights = block.items.map((item) => wrap(doc.font("Guide").fontSize(8.7), item, colW - 12) + 12);
      const maxH = Math.max(...heights.slice(0, maxRows));
      if (y + maxH * maxRows > bottom) break;
      block.items.forEach((item, i) => { const col = Math.floor(i / maxRows); const row = i % maxRows; const x = 48 + col * (colW + 14); const top = y + row * maxH; doc.fillColor(C.orange).font("GuideBold").fontSize(9).text("•", x, top); doc.fillColor(C.charcoal).font("Guide").fontSize(8.7).text(item, x + 10, top, { width: colW - 10, lineGap: 2 }); });
      y += maxH * maxRows + 12;
    } else if (block.kind === "cards") {
      const cols = block.columns ?? 2; const gap = 8; const cardW = (width - gap * (cols - 1)) / cols; const cardH = block.items.length > 4 ? 82 : 94; const rows = Math.ceil(block.items.length / cols);
      if (y + rows * (cardH + gap) > bottom) break;
      block.items.forEach((item, i) => { const row = Math.floor(i / cols); const col = i % cols; const x = 48 + col * (cardW + gap); const top = y + row * (cardH + gap); doc.roundedRect(x, top, cardW, cardH, 6).fillAndStroke(i % 3 === 1 ? C.light : C.mint, C.line); doc.fillColor(C.green).font("GuideBold").fontSize(9).text(item.title, x + 9, top + 10, { width: cardW - 18 }); if (item.status) { doc.fillColor(C.muted).font("GuideBold").fontSize(6.5).text(item.status.toUpperCase(), x + 9, top + 27, { width: cardW - 18 }); } doc.fillColor(C.charcoal).font("Guide").fontSize(7.5).text(item.text, x + 9, top + (item.status ? 40 : 29), { width: cardW - 18, height: cardH - 35, lineGap: 1.5 }); });
      y += rows * (cardH + gap) + 12;
    } else if (block.kind === "table") {
      const cols = block.headers.length; const colWidths = cols === 3 ? [width * .25, width * .48, width * .27] : cols === 2 ? [width * .32, width * .68] : Array(cols).fill(width / cols); const tableFont = block.rows.length > 7 ? 6.5 : 7.1;
      const drawRow = (cells: string[], header: boolean, index: number) => { const h = Math.max(...cells.map((cell, i) => wrap(doc.font(header ? "GuideBold" : "Guide").fontSize(tableFont), cell, colWidths[i] - 10))) + 13; if (y + h > bottom) return false; let x = 48; cells.forEach((cell, i) => { doc.rect(x, y, colWidths[i], h).fill(header ? C.green : index % 2 ? C.light : C.white); doc.fillColor(header ? C.white : C.charcoal).font(header ? "GuideBold" : "Guide").fontSize(tableFont).text(cell, x + 5, y + 5, { width: colWidths[i] - 10, lineGap: 1.5 }); x += colWidths[i]; }); y += h; return true; };
      if (!drawRow(block.headers, true, 0)) break; for (let i = 0; i < block.rows.length; i++) if (!drawRow(block.rows[i], false, i + 1)) break; y += 12;
    }
  }
  doc.fillColor(C.muted).font("Guide").fontSize(7).text(`FieldGrow  •  Service-to-Growth Engine™  •  ${pageNumber} / 20`, 48, doc.page.height - 34, { width, align: "right" });
}

async function main() {
  const doc = new PDFDocument({ size: "A4", margins: { top: 0, bottom: 0, left: 0, right: 0 }, bufferPages: false, info: { Title: "FieldGrow Complete Customer Product Guide", Author: "FieldGrow" } });
  const regular = join(root, "public/fonts/GuideSans.ttf"); const bold = join(root, "public/fonts/GuideSans-Bold.ttf");
  doc.registerFont("Guide", regular).registerFont("GuideBold", bold);
  const chunks: Buffer[] = []; const finished = new Promise<Buffer>((resolve, reject) => { doc.on("data", (chunk: Buffer) => chunks.push(chunk)); doc.on("end", () => resolve(Buffer.concat(chunks))); doc.on("error", reject); });
  pages.forEach((page, i) => { if (i > 0) doc.addPage(); drawPage(doc, page, i + 1); });
  doc.end();
  const buffer = await finished;
  writeFileSync(join(root, "public/docs", outputName), buffer);
  writeFileSync(join(root, "../FieldGrow-Pitch-Docs", outputName), buffer);
  console.log(`Generated ${outputName} with ${pages.length} fixed pages.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
