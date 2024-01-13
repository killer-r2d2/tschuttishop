import { Container } from "@/app/components/Base/Container";
import Image from "next/image";

export function Hero() {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end">
          <Image
            src="/hero-shirt.jpg"
            alt="Fußballshirt"
            width={500}
            objectFit="cover"
            height={500}
            style={{ width: "100%", height: "100%" }}
            className="rounded-xl"
          />
        </div>
        <div className="grid gap-y-5">
          <div className="rounded-2xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end">
            <Image
              src="/shirt-player.jpg"
              alt="Fußballspieler"
              width={500}
              objectFit="cover"
              height={500}
              style={{ width: "100%", height: "100%" }}
              className="rounded-2xl"
            />
          </div>
          <div className="rounded-2xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end">
            <Image
              src="/vintage-hero-wide.jpg"
              alt="Vintage Fußball"
              width={500}
              objectFit="cover"
              height={500}
              style={{ width: "100%", height: "100%" }}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
