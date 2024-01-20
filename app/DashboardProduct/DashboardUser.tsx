"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import { useGetProfileById } from "@/hooks/useGetProfileById";
import { UserIcon } from "@heroicons/react/24/solid";
import { DashboardUserModal } from "@/app/DashboardProduct/DashboardUserModal";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import React from "react";

export function DashboardUser({ profileId }: { profileId: string }) {
  const {
    profile: loadedProfile,
    isLoading,
    isError,
  } = useGetProfileById(profileId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <>
      <div>
        <div className="w-1/4 h-auto mb-4 bg-slate-200 rounded-xl mt-5">
          <UserIcon className="w-full" />
        </div>
        {loadedProfile && loadedProfile?.firstname ? (
          <>
            <ul className="mb-4">
              <li>
                {loadedProfile?.firstname} {loadedProfile?.lastname}
              </li>
              <li>{loadedProfile?.street}</li>
              <li>
                {loadedProfile?.zip} {loadedProfile?.city}
              </li>
            </ul>
            <Button onPress={onOpen}>Profil Bearbeiten</Button>
          </>
        ) : (
          <>
            <p className="mb-4">
              <strong>Keine Adresse hinterlegt</strong>
              <br />
              Damit Sie Produkte verkaufen oder kaufen können, müssen Sie eine
              Adresse angeben.
            </p>
            <Button onPress={onOpen} color="primary">
              Adresse angeben
            </Button>
          </>
        )}

        <DashboardUserModal
          profileId={profileId}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
    </>
  );
}
