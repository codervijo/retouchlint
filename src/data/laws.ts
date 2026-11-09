// src/data/laws.ts — listing-photo disclosure laws and bills (v1.K tracker).
// Every field is quoted/derived from docs/law-sources.md. `checked` is the date the
// status was last read from the official source — bump it only when you re-check.

export type Law = {
  id: string;
  jurisdiction: string;
  name: string;            // bill / statute label
  status: "in force" | "enacted" | "in committee" | "introduced";
  statusDetail: string;
  effective: string;       // human-readable
  covers: string;          // sale / rental scope
  who: string;             // who it applies to
  requires: string;        // one-line summary
  page: string;            // our page
  source: string;          // official URL
  checked: string;         // ISO date
};

export const LAWS: Law[] = [
  {
    id: "ca-sales",
    jurisdiction: "California",
    name: "AB 723 — Bus. & Prof. Code § 10140.8",
    status: "in force",
    statusDetail: "In force since January 1, 2026; amended by AB 2025 from January 1, 2027",
    effective: "January 1, 2026",
    covers: "Sale (from 2027, leases over one year move to the rental rule)",
    who: "Real estate brokers and salespersons, and people acting on their behalf",
    requires: "Altered-image statement on or next to the photo, plus a link, URL or QR code to a public page with the original",
    page: "/blog/california-real-estate-photo-disclosure/",
    source: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB2025",
    checked: "2026-11-08",
  },
  {
    id: "ca-rentals",
    jurisdiction: "California",
    name: "AB 2025 — Civil Code § 1940.11",
    status: "enacted",
    statusDetail: "Signed September 27, 2026 (Chapter 572); takes effect January 1, 2027",
    effective: "January 1, 2027",
    covers: "Rental",
    who: "Any person advertising a rental — landlords and property managers as well as licensees",
    requires: "Disclosure on or next to the photo; the original in the posting or via link, URL or QR code; fully AI-generated images count",
    page: "/laws/california-rentals/",
    source: "https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202520260AB2025",
    checked: "2026-11-08",
  },
  {
    id: "ny",
    jurisdiction: "New York",
    name: "A11635 — Real Property Law § 443-b (proposed)",
    status: "in committee",
    statusDetail: "Introduced July 29, 2026; referred to the Assembly Housing Committee",
    effective: "60 days after it becomes law",
    covers: "Sale and lease",
    who: "Brokers, sellers, property owners and property managers",
    requires: "Statement on or next to each altered or AI-generated image; on websites, the unaltered version or a link to it",
    page: "/laws/new-york/",
    source: "https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=A11635&term=2025&Summary=Y&Actions=Y&Text=Y&Memo=Y",
    checked: "2026-11-08",
  },
  {
    id: "dc",
    jurisdiction: "Washington, DC",
    name: "B26-0858 — Restricting Editing and Alterations in Listing Photos Amendment Act of 2026",
    status: "introduced",
    statusDetail: "Introduced October 9, 2026; with the Council",
    effective: "After Mayor's approval and 30-day congressional review",
    covers: "Sale and rental",
    who: "Listing agents, realtors and property managers (sponsor's statement), through DC's consumer-protection law plus a matching licensee rule",
    requires: "Clear and conspicuous disclosure, a written description of the material differences, and a public unedited version",
    page: "/laws/washington-dc/",
    source: "https://lims.dccouncil.gov/Legislation/B26-0858",
    checked: "2026-11-08",
  },
];

export const LAWS_CHECKED = "2026-11-08";
