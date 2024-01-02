import { Product } from "@/app/types/Product";
import { Container } from "@/app/components/Base/Container";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import {
  BanknotesIcon,
  EnvelopeIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";

export default function OrdersPageContent({
  id,
  name,
  description,
  price,
  size,
  category,
  inStock,
  isPaid,
  isShipped,
}: Product) {
  const handleMarkAsPaid = async () => {
    try {
      const response = await fetch('/api/updatePaymentStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      });
      if (!response.ok) {
        throw new Error('Failed to update payment status');
      }
      console.log('Produkt erfolgreich als bezahlt markiert');
    } catch (error) {
      console.error('Fehler beim Markieren als bezahlt: ', (error as Error).message);
    }
  };
  
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
                    {isPaid ? (
                      <p>
                        Sie haben den Betrag von <strong>{price} CHF</strong>{" "}
                        bezahlt.
                      </p>
                    ) : (
                      <>
                        <p>
                          Bitte Überweisen Sie den Betrag von{" "}
                          <strong>{price} CHF</strong> auf das folgende Konto:
                        </p>
                        <p className="mt-5">
                          Name Vorname
                          <br />
                          IBAN: CH00 0000 0000 0000 0000 0
                        </p>
                        <div className="mt-5">
                          <Button color="primary" size="sm" onClick={handleMarkAsPaid}>
                            Als bezahlt markieren
                          </Button>
                        </div>
                      </>
                    )}
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="shipment"
                title={
                  <div className="flex items-center space-x-2">
                    <TruckIcon className="w-6" />
                    <span>Versand</span>
                  </div>
                }
              >
                <Card shadow="none" className="border">
                  <CardBody>
                    {isShipped ? (
                      <p>Der Verkäufer hat das Produkt an Sie versendet.</p>
                    ) : (
                      <p>
                        Der Verkäufer wird Ihnen das Produkt so schnell wie
                        möglich zusenden.
                      </p>
                    )}
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
