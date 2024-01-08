"use client";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Container } from "../Base/Container";
import { useState } from "react";
import { Logo } from "@/app/components/Navigation/Logo";
import { CartNav } from "@/app/components/Navigation/CartNav";
import { NavLink } from "@/app/types/Navigation";
import { FavoritesNav } from "@/app/components/Navigation/FavoritesNav";

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Alle Produkte", href: "/Categories/all" },
];

export function Navigation() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {/* Desktop */}
      <nav className="pt-4 pb-4 bg-slate-900 shadow mb-5 hidden lg:block">
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
              <div className="flex gap-4 items-center">
                <FavoritesNav />
                <CartNav />
              </div>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile */}
      <nav className="sticky top-0 z-50 pt-4 pb-4 bg-slate-900 shadow mb-5 lg:hidden">
        <Container>
          <div className="flex justify-between items-center lg:block">
            <Logo />
            <div className="flex gap-2 items-center">
              <FavoritesNav />
              <CartNav />
              <button className="block" onClick={() => setToggle(!toggle)}>
                <Bars4Icon
                  className={`${
                    !toggle ? "block" : "hidden"
                  } w-10 text-slate-100 hover:text-slate-500 transition-colors`}
                />
                <XMarkIcon
                  className={`${
                    !toggle ? "hidden" : "block"
                  } w-10 text-slate-100 hover:text-slate-500 transition-colors`}
                />
              </button>
            </div>
          </div>
        </Container>
        <div
          className={`${
            !toggle ? "hidden" : "block"
          } bg-slate-900 shadow text-slate-100 pb-5 transition`}
        >
          <Container>
            <ul className="text-center text-xl">
              {navLinks.map((link: NavLink) => (
                <li
                  key={link.name}
                  className="hover:text-slate-500 transition-colors mt-5"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </nav>
    </>
  );
}
