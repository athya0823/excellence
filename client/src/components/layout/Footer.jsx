import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container className="py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-bold">NEET Excellence Medical Academy</div>
            <div className="text-sm text-neutral-600 mt-2">
              Temporary footer content — will be replaced with final details.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Quick Links</div>
            <ul className="mt-2 space-y-1 text-sm text-neutral-600">
              <li>Courses</li>
              <li>Faculty</li>
              <li>Results</li>
              <li>Admission</li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-2 text-sm text-neutral-600">
              Phone: +91 7903537573<br />
              Email: nishant.kumar.or@gmail.com
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-neutral-500">
          © {new Date().getFullYear()} NEET Excellence. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
