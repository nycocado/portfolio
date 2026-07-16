import { MobileMenu } from "portfolio";

// Real usage (Navbar) passes the nav's link list; the dropdown itself only
// appears after a click on the toggle button (internal state), so this cell
// shows the closed, at-rest button — see NOTES.md.
const links = [
  { href: "#projects", label: "Projects" },
  { href: "mailto:hello@example.com", label: "Contact" },
];

export const Default = () => (
  <div className="flex justify-end w-40">
    <MobileMenu links={links} />
  </div>
);
