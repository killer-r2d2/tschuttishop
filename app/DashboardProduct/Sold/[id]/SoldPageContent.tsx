"use client";
import { useState } from "react";
import { Product } from "@/app/types/Product";
import { Container } from "@/app/components/Base/Container";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { BanknotesIcon, TruckIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";

export default function SoldPageContent({
  id,
  name,
  description,
  price,
  size,
  club,
  category,
  inStock,
  isPaid,
  isShipped,
}: Product) {
  const [isShippedState, setIsShippedState] = useState(isShipped);
  const { updateProduct } = useUpdateProduct();
  const handleMarkAsShipped = async () => {
    try {
      await updateProduct({
        id,
        isShipped: true,
      });
      setIsShippedState(true);
    } catch (error) {
      console.log(error);
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
            <p>Club: {club}</p>
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
                        Der Käufer hat die Rechnung bezahlt.
                        <br />
                        Sobald sie die Ware versendet haben, können Sie den
                        Status unter `&quot;`Versand`&quot;` ändern.
                      </p>
                    ) : (
                      <>
                        <p>
                          Warten Sie auf die Bezahlung de Käufers:
                          <strong>{price} CHF</strong>
                        </p>
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
                    {isShippedState ? (
                      <p>Sie haben das Produkt an den Käufer gesendet.</p>
                    ) : (
                      <>
                        <p>
                          Senden Sie das Produkt an die folgende Adresse:
                          <br />
                          <strong>Vorname Nachname</strong>
                          <br />
                          <strong>Strasse 1</strong>
                          <br />
                          <strong>1234 Stadt</strong>
                        </p>
                        <div className="mt-5">
                          <Button color="primary" size="sm" onClick={handleMarkAsShipped}>
                            Als versendet markieren
                          </Button>
                        </div>
                      </>
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
