import { Container } from "../Base/Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white p-5 shadow mt-5">
      <Container>
        <div className="grid grid-cols-2 gap-4">
          <ul className="col-span-full md:col-span-1">
            <li className="text-xl mb-2">tschuttishop gmbh</li>
            <li>Bahnhofstrasse 1</li>
            <li>8000 Zürich</li>
            <li>
              <Link
                href="mailto:info@tschuttishop.ch
"
              >
                info@tschuttishop.ch
              </Link>
            </li>
            {/* phone */}
            <li>
              <Link href="tel:+41442211222">+41 44 221 12 22</Link>
            </li>
          </ul>

          <div className="col-span-full md:col-span-1">
            <ul className="flex gap-y-1 md:gap-4 flex-col md:flex-row md:items-end h-full">
              <li>
                <Link href="/">Datenschutz</Link>
              </li>
              <li>
                <Link href="/">Impressum</Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
