import {
  UserCircleIcon,
  ShoppingCartIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../Base/Container";

export function Navigation() {
  return (
    <>
      <nav className="sticky top-0 z-50">
        <Container>
          <div className="bg-slate-900 p-5 flex justify-between items-center border-x border-b border-slate-500 rounded-b-xl shadow mb-5">
            <button className="block md:hidden">
              <Bars4Icon className="w-10 text-slate-100 hover:text-slate-500 transition-colors" />
            </button>
            <Link href="/" className="flex gap-4 items-center">
              <Image
                src="../logo-light.svg"
                alt="Tschuttishop Logo"
                width={40}
                height={40}
              />
              <p className="text-2xl text-slate-100">Tschuttishop</p>
            </Link>
            <div className="flex gap-16 items-center">
              <ul className="flex gap-5 text-slate-100">
                <li className="hover:text-slate-500 transition-colors">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-slate-500 transition-colors">
                  Shirts
                </li>
                <li className="hover:text-slate-500 transition-colors">
                  Schuhe
                </li>
              </ul>
              <div className="flex gap-4">
                <Link href="/dashboard">
                  <UserCircleIcon className="w-8 text-slate-100 hover:text-slate-500 transition-colors" />
                </Link>
                <ShoppingCartIcon className="w-8 text-slate-100 hover:text-slate-500 transition-colors" />
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
