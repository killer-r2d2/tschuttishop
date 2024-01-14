"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useGetProfileById } from "@/hooks/useGetProfileById";
import { Profile } from "@/app/types/Profile";
import { UserIcon } from "@heroicons/react/24/solid";

export function DashboardUser({ profileId }: { profileId: string }) {
  const { profile: loadedProfile, refreshProfile } =
    useGetProfileById(profileId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    if (loadedProfile && isOpen) {
      setProfile({
        firstname: loadedProfile.firstname || "",
        lastname: loadedProfile.lastname || "",
        street: loadedProfile.street || "",
        city: loadedProfile.city || "",
        zip: loadedProfile.zip || "",
      });
    }
  }, [loadedProfile, isOpen]);

  const { updateProfile } = useUpdateProfile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(profileId, { ...profile } as Partial<Profile>);
      onClose();
      refreshProfile();
    } catch (error) {
      console.error(error);
    }
  };

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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Profil Bearbeiten</ModalHeader>
            <ModalBody>
              <Input
                variant="bordered"
                label="Vorname"
                name="firstname"
                value={profile.firstname}
                onChange={handleInputChange}
              />
              <Input
                variant="bordered"
                label="Nachname"
                name="lastname"
                value={profile.lastname}
                onChange={handleInputChange}
              />
              <Input
                variant="bordered"
                label="Straße"
                name="street"
                value={profile.street}
                onChange={handleInputChange}
              />
              <Input
                variant="bordered"
                label="Stadt"
                name="city"
                value={profile.city}
                onChange={handleInputChange}
              />
              <Input
                variant="bordered"
                label="PLZ"
                name="zip"
                value={profile.zip}
                onChange={handleInputChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Schließen
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Speichern
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
