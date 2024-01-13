"use client";
import { Button } from "@nextui-org/button";
import { BanknotesIcon, TruckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/app/types/Product";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import React from "react";

export function DashboardStatus({ profileId }: { profileId: string }) {
  const { products, isLoading, isError } = useProducts();

  const unshippedItems = (products as Product[])?.filter(
    (product) =>
      product.profileId === profileId && product.buyerId && !product.isShipped,
  );

  const unpaidItems = (products as Product[])?.filter(
    (product) => product.buyerId === profileId && !product.isPaid,
  );

  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <>
      <div className="">
        <div>
          <h2 className="text-xl font-bold">Offene Rechnung</h2>
          {unpaidItems?.length > 0 ? (
            <div className="flex p-5 gap-x-16 items-center rounded-xl bg-warning-50 lg:w-fit mt-3">
              <div>
                <p>
                  Sie haben noch <strong>{unpaidItems?.length}</strong> offene
                  Rechnungen!
                </p>
                <Button
                  color="primary"
                  size="sm"
                  as={Link}
                  href="/DashboardProduct/Orders"
                  className="mt-3"
                >
                  Zu gekauften Artikeln
                </Button>
              </div>
              <BanknotesIcon className="w-10" />
            </div>
          ) : (
            <p>Keine offenen Rechnungen</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold">Offene Sendungen</h2>
        {unshippedItems?.length > 0 ? (
          <div className="flex p-5 gap-x-16 items-center rounded-xl bg-warning-50 lg:w-fit mt-3">
            <div>
              <p>
                Sie haben noch <strong>{unshippedItems?.length}</strong>{" "}
                Produkte die Sie versenden müssen!
              </p>
              <Button
                href="/DashboardProduct/Sold"
                as={Link}
                color="primary"
                size="sm"
                className="mt-3"
              >
                Zu verkauften Artikeln
              </Button>
            </div>

            <TruckIcon className="w-10" />
          </div>
        ) : (
          <p>Keine offenen Sendungen</p>
        )}
      </div>
    </>
  );
}
