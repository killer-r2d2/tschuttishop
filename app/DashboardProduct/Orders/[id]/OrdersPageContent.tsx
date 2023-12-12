import { Product } from "@/app/types/Product";
import { Container } from "@/app/components/Base/Container";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { BanknotesIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

export default function OrdersPageContent({
  id,
  name,
  description,
  price,
  size,
  category,
  inStock,
}: Product) {
  return (
    <Container>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-full">
          <h2 className="text-5xl font-bold mb-5">Bestellung: {id}</h2>
        </div>
        <div className="col-span-full xl:col-span-6 grid grid-cols-2 gap-x-4">
          <div className="col-span-full xl:col-span-1 relative">
            <img src="/shirt-player.png" alt={name} className="rounded-xl" />
          </div>
          <div className="col-span-full xl:col-span-1 flex flex-col gap-8">
            <h2 className="text-xl font-bold">{name}</h2>
            <div>
              <p>
                Preis: <span className="font-bold">{price} CHF</span>
              </p>
              <p className="mt-2">Grösse: {size}</p>
              <p className="mt-2">Kategorie: {category}</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-6">
          <h2 className="text-2xl font-bold mb-2">Status</h2>
          <div className="flex w-full flex-col">
            <Tabs
              aria-label="Options"
              size="lg"
              color="primary"
              variant="underlined"
            >
              <Tab
                key="payment"
                title={
                  <div className="flex items-center space-x-2">
                    <BanknotesIcon className="w-6" />
                    <span>Zahlung</span>
                  </div>
                }
              >
                <Card shadow="none" className="border">
                  <CardBody>
                    Bitte Übeerweisen Sie den Betrag von{" "}
                    <strong>CHF {price}</strong> auf das folgende Konto:
                    <br />
                    KONTODATEN VERKÄUFER
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="shipment"
                title={
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="w-6" />
                    <span>Versand</span>
                  </div>
                }
              >
                <Card shadow="none" className="border">
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est
                    laborum.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa awdawd wdada wd
                    awdaw da wdaw dawd awdawd awd awdawdawdd a a a a a a a a
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est
                    laborum.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa awdawd wdada wd
                    awdaw da wdaw dawd awdawd awd awdawdawdd a a a a a a a a
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est
                    laborum.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa awdawd wdada wd
                    awdaw da wdaw dawd awdawd awd awdawdawdd a a a a a a a a
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est
                    laborum.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa awdawd wdada wd
                    awdaw da wdaw dawd awdawd awd awdawdawdd a a a a a a a a
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam,
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Container>
  );
}
