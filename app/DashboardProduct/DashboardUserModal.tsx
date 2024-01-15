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

export function DashboardUserModal({
  profileId,
  onOpen,
  onClose,
  isOpen,
}: {
  profileId: string;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}) {
  const { profile: loadedProfile, refreshProfile } =
    useGetProfileById(profileId);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileId, { ...profile } as Partial<Profile>);
      refreshProfile();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Profil Bearbeiten</ModalHeader>
            <ModalBody>
              {!profile.street && (
                <p>
                  Damit Sie Produkte verkaufen oder kaufen können, müssen Sie
                  eine Adresse angeben.
                </p>
              )}
              <Input
                variant="bordered"
                label="Vorname"
                name="firstname"
                value={profile.firstname}
                onChange={handleInputChange}
                isRequired
              />
              <Input
                variant="bordered"
                label="Nachname"
                name="lastname"
                value={profile.lastname}
                onChange={handleInputChange}
                isRequired
              />
              <Input
                variant="bordered"
                label="Straße"
                name="street"
                value={profile.street}
                onChange={handleInputChange}
                isRequired
              />
              <Input
                variant="bordered"
                label="Stadt"
                name="city"
                value={profile.city}
                onChange={handleInputChange}
                isRequired
              />
              <Input
                variant="bordered"
                label="PLZ"
                name="zip"
                value={profile.zip}
                onChange={handleInputChange}
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Schließen
              </Button>
              <Button color="primary" type="submit">
                Speichern
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
