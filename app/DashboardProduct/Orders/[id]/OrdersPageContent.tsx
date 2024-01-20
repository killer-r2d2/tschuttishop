"use client";
import { useState } from "react";
import { Product } from "@/app/types/Product";
import { Container } from "@/app/components/Base/Container";
import { Tabs, Tab, Card, CardBody, Snippet, Badge } from "@nextui-org/react";
import Image from "next/image";
import { BanknotesIcon, CheckIcon, TruckIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import BackButton from "@/app/components/Base/BackButton";
import { useGetProfileById } from "@/hooks/useGetProfileById";
import { Section } from "@/app/components/Base/Section";

export default function OrdersPageContent({
  id,
  name,
  price,
  size,
  club,
  profileId,
  isPaid,
  isShipped,
  isVintage,
  image,
}: Product) {
  const { profile } = useGetProfileById(profileId || "");

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
    <Section>
      <Container>
        <BackButton />
        <div className="grid grid-cols-12">
          <div className="col-span-full">
            <div className="flex flex-col lg:flex-row justify-between">
              <h1 className="text-5xl font-bold mb-5">Bestellung: {id}</h1>
              {isPaidState && isShipped ? (
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
                      {isPaidState ? (
                        <CheckIcon className="w-6" />
                      ) : (
                        <BanknotesIcon className="w-6" />
                      )}
                      {!isPaidState ? (
                        <Badge color="warning" content="">
                          <span>Zahlung</span>
                        </Badge>
                      ) : (
                        <span>Zahlung</span>
                      )}
                    </div>
                  }
                >
                  <Card shadow="none" className="border">
                    <CardBody>
                      {isPaidState ? (
                        <p className="bg-success-100 w-fit p-3 rounded-xl text-success-600">
                          Sie haben den Betrag von <strong>{price} CHF</strong>{" "}
                          bezahlt.
                        </p>
                      ) : (
                        <>
                          <p>
                            Bitte Überweisen Sie den Betrag von{" "}
                            <strong>{price} CHF</strong> auf das folgendes
                            Konto:
                          </p>
                          <p className="mt-5">
                            <strong>Adresse</strong>
                          </p>
                          <p>
                            {profile?.firstname} {profile?.lastname}
                            <br />
                            {profile?.street}
                            <br />
                            {profile?.zip} {profile?.city}
                          </p>
                          <div className="mt-3">
                            <Snippet symbol="IBAN:">
                              CH3889144934957271925
                            </Snippet>
                          </div>
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
                      {isShipped ? (
                        <CheckIcon className="w-6" />
                      ) : (
                        <TruckIcon className="w-6" />
                      )}
                      <span>Versand</span>
                    </div>
                  }
                >
                  <Card shadow="none" className="border">
                    <CardBody>
                      {isShipped ? (
                        <div className="bg-success-100 w-fit p-3 rounded-xl text-success-600">
                          <p>Der Verkäufer hat das Produkt an Sie versendet.</p>
                        </div>
                      ) : (
                        <p>
                          Der Verkäufer wird Ihnen das Produkt so schnell wie
                          möglich senden.
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
    </Section>
  );
}
