"use client";

import {
  UserCircleIcon,
  ShoppingCartIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../Base/Container";
import { useState } from "react";
import { Logo } from "@/app/components/Navigation/Logo";
import { CartUser } from "@/app/components/Navigation/CartUser";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Neu eingetroffen", href: "/" },
  { name: "Klubs", href: "/" },
  { name: "Vintage", href: "/" },
];

export function Navigation() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {/* Desktop */}
      <nav className="sticky top-0 z-50 pt-4 pb-4 bg-slate-900 shadow mb-5 hidden lg:block">
        <Container>
          <div className="flex justify-between items-center">
            <Logo />
            <div className="gap-16 items-center hidden lg:flex">
              <ul className="flex gap-5 text-slate-100">
                {navLinks.map((link: NavLink) => (
                  <li
                    key={link.name}
                    className="hover:text-slate-500 transition-colors"
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
              <CartUser />
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile */}
      <nav className="sticky top-0 z-50 pt-4 pb-4 bg-slate-900 shadow mb-5 lg:hidden">
        <Container>
          <div className="flex justify-between items-center lg:block">
            <Logo />
            <div className="flex gap-8">
              <CartUser />
              <button className="block" onClick={() => setToggle(!toggle)}>
                <Bars4Icon className="w-10 text-slate-100 hover:text-slate-500 transition-colors" />
              </button>
            </div>
          </div>
        </Container>
        <div className={`${!toggle ? "hidden" : "block"} bg-slate-900 p-20`}>
          <Container>
            {navLinks.map((link: NavLink) => (
              <li
                key={link.name}
                className="hover:text-slate-500 transition-colors"
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </Container>
        </div>
      </nav>
    </>
  );
}
