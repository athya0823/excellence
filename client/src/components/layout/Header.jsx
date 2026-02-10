import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { navLinks } from "../../data/navLinks";
import { siteConfig } from "../../data/siteConfig";
import logo from "../../assets/logo/logo.png";

const linkClass = ({ isActive }) =>
  `text-sm font-semibold transition ${
    isActive
      ? "text-brand-primary"
      : "text-neutral-700 hover:text-brand-primary"
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur border-b border-neutral-200">
      {/* Top contact strip */}
      <div className="border-b border-neutral-200 bg-brand-primary text-white">
        <Container className="py-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <span className="opacity-95">📞 {siteConfig.phone}</span>
              <span className="opacity-95">✉️ {siteConfig.email}</span>
              <span className="opacity-80">📍 {siteConfig.addressShort}</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-4 hover:opacity-90"
              >
                WhatsApp
              </a>
              <Link
                to="/admission"
                className="font-semibold underline underline-offset-4 hover:opacity-90"
              >
                Enquiry
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main navbar */}
      <div className="bg-white/90 backdrop-blur">
        <Container className="py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <img
                src={logo}
                alt="NEET Excellence Logo"
                className="h-10 w-10 rounded-2xl object-contain bg-white ring-1 ring-neutral-200"
              />
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-text-heading">
                  {siteConfig.brandName}
                </div>
                <div className="text-xs text-text-muted">{siteConfig.tagline}</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((l) => (
                <NavLink key={l.to} to={l.to} className={linkClass}>
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/admission">
                <Button className="bg-brand-primary hover:opacity-90">
                  Enquire Now
                </Button>
              </Link>
            </div>

            {/* Mobile button */}
            <button
              type="button"
              className="lg:hidden rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>

          {/* Mobile menu */}
          {open ? (
            <div className="lg:hidden mt-3 rounded-2xl border border-neutral-200 bg-white overflow-hidden">
              <div className="p-3 grid gap-2">
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "bg-brand-primary text-white"
                          : "hover:bg-brand-accentSoft text-neutral-800"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}

                <Link to="/admission" onClick={() => setOpen(false)} className="mt-2">
                  <Button className="w-full bg-brand-primary hover:opacity-90">
                    Enquire Now
                  </Button>
                </Link>

                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold hover:bg-brand-accentSoft text-center text-neutral-800"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ) : null}
        </Container>
      </div>
    </header>
  );
}
