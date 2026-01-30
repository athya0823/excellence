import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { navLinks } from "../../data/navLinks";
import { siteConfig } from "../../data/siteConfig";
import logo from "../../assets/logo/logo.png";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? "text-black" : "text-neutral-700 hover:text-black"
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top contact strip */}
      <div className="border-b border-neutral-200 bg-black text-white">
        <Container className="py-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <span>📞 {siteConfig.phone}</span>
              <span>✉️ {siteConfig.email}</span>
              <span className="opacity-80">📍 {siteConfig.addressShort}</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:opacity-90"
              >
                WhatsApp
              </a>
              <Link to="/admission" className="underline underline-offset-4 hover:opacity-90">
                Enquiry
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main navbar */}
      <div className="bg-white/90 backdrop-blur border-b border-neutral-200">
        <Container className="py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <img
                  src={logo}
                  alt="NEET Excellence Logo"
                  className="h-10 w-10 rounded-2xl object-contain bg-white"
                />
              <div className="leading-tight">
                <div className="text-sm font-extrabold">{siteConfig.brandName}</div>
                <div className="text-xs text-neutral-500">{siteConfig.tagline}</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((l) => (
                <NavLink key={l.to} to={l.to} className={linkClass}>
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/admission">
                <Button>Enquire Now</Button>
              </Link>
            </div>

            {/* Mobile button */}
            <button
              type="button"
              className="lg:hidden rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold hover:bg-neutral-50"
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
                      `rounded-xl px-3 py-2 text-sm font-medium transition ${
                        isActive ? "bg-black text-white" : "hover:bg-neutral-50"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}

                <Link to="/admission" onClick={() => setOpen(false)} className="mt-2">
                  <Button className="w-full">Enquire Now</Button>
                </Link>

                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold hover:bg-neutral-50 text-center"
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
