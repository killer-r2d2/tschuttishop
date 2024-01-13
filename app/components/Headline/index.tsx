import { Section } from "../Base/Section";
import { Container } from "../Base/Container";

export function Headline() {
  return (
    <>
      <Section>
        <Container>
          <div className="flex flex-col justify-center items-start text-left">
            <h1 className="text-4xl font-bold text-gray-800">
              Tschuttishop, von Fans für Fans
            </h1>
            <p className="text-lg mt-2 max-w-3xl">
              Entdecken Sie Ihr neues Lieblings-Trikot in unserer Auswahl. Von aktuellen Designs bis hin zu Vintage-Klassikern
              – finden Sie das perfekte Trikot für Ihre Sammlung.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
