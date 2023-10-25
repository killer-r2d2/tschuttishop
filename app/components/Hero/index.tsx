import styles from "./hero.module.css";
import { Container } from "@/app/components/Base/Container";

export function Hero() {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[75vh]">
        <div className="bg-hero-shirt bg-center lg:row-span-2 rounded-xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end p-5">
          <button className="bg-slate-900 p-3 text-slate-100 text-xl rounded-xl hover:shadow-xl hover:bg-slate-800 transition">
            New arrivals
          </button>
        </div>
        <div className="bg-hero-player bg-center rounded-2xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end p-5">
          <button className="bg-slate-900 p-3 text-slate-100 text-xl rounded-xl hover:shadow-xl hover:bg-slate-800 transition">
            Klubs
          </button>
        </div>
        <div className="bg-hero-vintage bg-right rounded-2xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end p-5">
          <button className="bg-slate-900 p-3 text-slate-100 text-xl rounded-xl hover:shadow-xl hover:bg-slate-800 transition">
            Vintage
          </button>
        </div>
      </div>
    </Container>
  );
}
