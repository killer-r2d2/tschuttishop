import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex gap-3 items-center">
      <Image
        src="../logo-light.svg"
        alt="Tschuttishop Logo"
        width={34}
        height={34}
        className="hover:rotate-90 transition"
      />
      <p className="text-2xl text-slate-100">Tschuttishop</p>
    </Link>
  );
}
