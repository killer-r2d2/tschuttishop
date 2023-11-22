import styles from "./hero.module.css";
import { Container } from "@/app/components/Base/Container";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export function Hero() {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[75vh]">
        <div className="bg-hero-shirt bg-center lg:row-span-2 rounded-xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end p-5">
          <Button
            size="lg"
            color="primary"
            radius="sm"
            variant="shadow"
            as={Link}
            href="/Categories/vintage"
          >
            Neu eingetroffen
          </Button>
        </div>
        <div className="bg-hero-player bg-center rounded-2xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end p-5">
          <Button
            size="lg"
            color="primary"
            radius="sm"
            variant="shadow"
            as={Link}
            href="/Categories/club"
          >
            Club
          </Button>
        </div>
        <div className="bg-hero-vintage bg-right rounded-2xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end p-5">
          <Button
            size="lg"
            color="primary"
            radius="sm"
            variant="shadow"
            as={Link}
            href="/Categories/vintage"
          >
            Vintage
          </Button>
        </div>
      </div>
    </Container>
  );
}
