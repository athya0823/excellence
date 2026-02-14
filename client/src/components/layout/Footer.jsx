import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-200">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="text-sm font-extrabold text-white">
              NEET Excellence Medical Academy
            </div>
            <div className="mt-3 text-sm text-neutral-400 leading-relaxed">
              From Aspirant to Doctor
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-sm font-semibold text-white">Quick Links</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-neutral-400 hover:text-white transition cursor-pointer">
                Courses
              </li>
              <li className="text-neutral-400 hover:text-white transition cursor-pointer">
                Faculty
              </li>
              <li className="text-neutral-400 hover:text-white transition cursor-pointer">
                Results
              </li>
              <li className="text-neutral-400 hover:text-white transition cursor-pointer">
                Admission
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-semibold text-white">Contact</div>
            <div className="mt-3 text-sm text-neutral-400 leading-relaxed">
              Phone: +91 9067233111, +91 9075120325
              <br />
              Email: nema@gmail.com
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-neutral-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>
            © {new Date().getFullYear()} MED-JEE. All rights reserved.
          </span>
          <span className="text-neutral-500">
            Designed for medical aspirants
          </span>
        </div>
      </Container>
    </footer>
  );
}
