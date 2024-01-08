import { NavLink } from "@/app/types/Navigation";
import Link from "next/link";

const navLinks: NavLink[] = [
  { name: "Vintage", href: "/Categories/vintage" },
];
export function SideNavigation() {
  return (
    <div className="bg-slate-200 h-fit p-5 rounded-xl">
      <p className="font-bold">Mehr entdecken</p>
      <ul>
        {navLinks.map((link: NavLink) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:text-slate-500 transition">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
