"use client";
import { useState } from "react";
import { Product } from "@/app/types/Product";
import { Container } from "@/app/components/Base/Container";
import { Section } from "@/app/components/Base/Section";
import { Tabs, Tab, Card, CardBody, Badge } from "@nextui-org/react";
import { BanknotesIcon, CheckIcon, TruckIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import BackButton from "@/app/components/Base/BackButton";
import Image from "next/image";
import { useGetProfileById } from "@/hooks/useGetProfileById";

export default function SoldPageContent({
  id,
  name,
  price,
  size,
  club,
  isPaid,
  isShipped,
  buyerId,
  isVintage,
  image,
}: Product) {
  const { profile } = useGetProfileById(buyerId || "");

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
    <Section>
      <Container>
        <BackButton />
        <div className="grid grid-cols-12">
          <div className="col-span-full">
            <div className="flex flex-col lg:flex-row justify-between">
              <h1 className="text-5xl font-bold mb-5">Verkauf: {id}</h1>
              {isPaid && isShippedState ? (
                <div className="bg-success-100 text-xl w-fit h-fit p-3 rounded-xl text-success-600">
                  <p>Abgeschlossen</p>
                </div>
              ) : (
                <div className="bg-warning-100 text-xl w-fit h-fit p-3 rounded-xl text-warning-600">
                  <p>In Bearbeitung</p>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-full xl:col-span-6 xl:grid flex flex-col lg:flex-row xl:grid-rows-0 xl:grid-cols-2 xl:gap-x-4 gap-y-4 mb-8 xl:mb-0 mt-5 lg:mt-0">
            <div className="xl:col-span-1 md:mr-8 aspect-[4/3] max-w-lg">
              <Image
                src={image ? image : "/placeholder.jpg"}
                alt={name}
                width={400}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="rounded-xl"
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
                {isVintage && <p>Vintage</p>}
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
                      {isPaid ? (
                        <CheckIcon className="w-6" color="success" />
                      ) : (
                        <BanknotesIcon className="w-6" />
                      )}
                      <span>Zahlung</span>
                    </div>
                  }
                >
                  <Card shadow="none" className="border">
                    <CardBody>
                      {isPaid ? (
                        <>
                          <div className="bg-success-100 w-fit p-3 rounded-xl text-success-600">
                            <p>
                              Der Käufer hat die Rechnung als bezahlt markiert.
                            </p>
                          </div>
                          <p className="mt-5">
                            Sobald Sie die Ware versendet haben, können Sie den
                            Status unter &quot;Versand&quot; ändern.
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            Warten Sie auf die Bezahlung de Käufers:
                            <strong> {price} CHF</strong>
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
                      {isShippedState ? (
                        <CheckIcon className="w-6" />
                      ) : (
                        <TruckIcon className="w-6" />
                      )}
                      {isPaid && !isShippedState ? (
                        <Badge content="" color="warning">
                          <span>Versand</span>
                        </Badge>
                      ) : (
                        <span>Versand</span>
                      )}
                    </div>
                  }
                >
                  <Card shadow="none" className="border">
                    <CardBody>
                      {isShippedState ? (
                        <>
                          <div className="bg-success-100 w-fit p-3 rounded-xl text-success-600">
                            <p className="text-success-600">
                              Sie haben das Produkt an den Käufer gesendet.
                            </p>
                          </div>
                          <p className="mt-5">
                            <strong>Adresse:</strong>
                            <br />
                            {profile?.firstname} {profile?.lastname}
                            <br />
                            {profile?.street}
                            <br />
                            {profile?.zip} {profile?.city}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            Senden Sie das Produkt an die folgende Adresse:
                            <br />
                            <strong>
                              {profile?.firstname} {profile?.lastname}
                            </strong>
                            <br />
                            <strong>{profile?.street}</strong>
                            <br />
                            <strong>
                              {profile?.zip} {profile?.city}
                            </strong>
                          </p>
                          <div className="mt-5">
                            <Button
                              color="primary"
                              size="sm"
                              onClick={handleMarkAsShipped}
                            >
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
    </Section>
  );
}
