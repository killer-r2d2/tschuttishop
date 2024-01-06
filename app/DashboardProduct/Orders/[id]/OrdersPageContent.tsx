"use client";
import { useState } from "react";
import { Product } from "@/app/types/Product";
import { Container } from "@/app/components/Base/Container";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { BanknotesIcon, TruckIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import BackButton from "@/app/components/Base/BackButton";

export default function OrdersPageContent({
  id,
  name,
  description,
  price,
  category,
  size,
  club,
  inStock,
  isVintage,
  createdAt,
  updatedAt,
  profileId,
  buyerId,
  isPaid,
  isShipped,
}: Product) {
  const [isPaidState, setIsPaidState] = useState(isPaid);
  const { updateProduct } = useUpdateProduct();
  const handleMarkAsPaid = async () => {
    try {
      await updateProduct({
        id,
        isPaid: true,
      });
      setIsPaidState(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <BackButton />
      <div className="grid grid-cols-12">
        <div className="col-span-full">
          <h1 className="text-5xl font-bold mb-5">Bestellung: {id}</h1>
        </div>
        <div className="col-span-full xl:col-span-6 xl:grid flex flex-col lg:flex-row xl:grid-rows-0 xl:grid-cols-2 xl:gap-x-4 gap-y-4 mb-8 xl:mb-0">
          <div className="xl:col-span-1 md:mr-8 aspect-[4/3] max-w-lg">
            <img
              src="/shirt-player.png"
              alt="shirt-player"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="col-span-full xl:col-span-1 flex flex-col">
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
        <div className="col-span-full xl:col-span-6">
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
                    {isPaidState ? (
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
                          <Button
                            color="primary"
                            size="sm"
                            onClick={handleMarkAsPaid}
                          >
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
