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
        <div className="p-2 col-span-full xl:col-span-4 relative">
          <img src="/shirt-player.png" alt={name} className="rounded-xl" />
        </div>
        <div className="col-span-full xl:col-span-8 flex flex-col gap-8">
          <h2 className="text-2xl font-bold">{name}</h2>
          <div>
            <p>
              Preis: <span className="font-bold">{price} CHF</span>
            </p>
            <p className="mt-2">Grösse: {size}</p>
            <p className="mt-2">Kategorie: {category}</p>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-8">
          <h2 className="text-2xl font-bold mb-2">Status</h2>
          <div className="flex w-full flex-col">
            <Tabs
              aria-label="Options"
              size="lg"
              color="primary"
              variant="bordered"
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
                <Card>
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
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
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
