import { Container } from "@/app/components/Base/Container";
import Image from "next/image";
import { Link, Button } from "@nextui-org/react";

export function Hero() {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl relative shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end">
          <Image
            src="/hero-shirt.jpg"
            alt="Fußballshirt"
            width={500}
            objectFit="cover"
            height={500}
            style={{ width: "100%", height: "100%" }}
            className="rounded-xl"
          />
          <Button
            className="absolute bottom-5 right-5"
            href="/AllProducts"
            as={Link}
            color="primary"
            variant="solid"
          >
            Alle Produkte
          </Button>
        </div>
        <div className="grid gap-y-5">
          <div className="rounded-2xl relative shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end">
            <Image
              src="/shirt-player.jpg"
              alt="Fußballspieler"
              width={500}
              objectFit="cover"
              height={500}
              style={{ width: "100%", height: "100%" }}
              className="rounded-2xl"
            />
            <Button
              className="absolute bottom-5 right-5"
              href="#newArrivals"
              as={Link}
              color="primary"
              variant="solid"
            >
              New Arrivals
            </Button>
          </div>
          <div className="rounded-2xl shadow-xl hover:scale-101 hover:shadow-2xl transition flex flex-col justify-end items-end">
            <video
              src="/football-video.mp4"
              className="w-full rounded-2xl"
              controls={false}
              preload="none"
              autoPlay
              playsInline
              loop
              muted
              poster="/shirt-player.jpg"
            ></video>
          </div>
        </div>
      </div>
    </Container>
  );
}
