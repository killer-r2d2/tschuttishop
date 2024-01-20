"use client";
import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { Input, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import {
  productAspectsSizes,
  productAspectsClubs,
} from "@/app/DashboardProduct/formProductAspects";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useGetProfileById } from "@/hooks/useGetProfileById";
import { DashboardUserModal } from "@/app/DashboardProduct/DashboardUserModal";
import DashboardProductImage from "@/app/DashboardProduct/New/DashboardProductImage";

export function DashboardProductForm({ profileId }: { profileId: string }) {
  const sizes = productAspectsSizes;
  const clubs = productAspectsClubs;
  const { profile } = useGetProfileById(profileId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageUploadError, setImageUploadError] = useState<string>("hidden");
  const [focusUpload, setFocusUpload] = useState<string>("");

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    size: "M",
    club: "FC Basel",
    price: 0.0,
    inStock: true,
    isVintage: false,
    profileId: profileId,
  });
  const { isLoading, isError, createProduct, isSuccess } = useCreateProduct();

  //automatically handle image from state
  const handleImageChange = (url: string) => {
    setFormData({ ...formData, image: url });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const actualValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : value;
    setFormData({ ...formData, [name]: actualValue });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        image: "",
        name: "",
        description: "",
        size: "",
        club: "",
        price: 0.0,
        inStock: true,
        isVintage: false,
        profileId: profileId,
      });
      setImageUploadError("hidden");
      setFocusUpload("");
    }
  }, [isSuccess, profileId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.profileId) {
      console.log("profileId is missing");
    } else if (!formData.image) {
      setImageUploadError("block");
      setFocusUpload("bg-red-200 p-2 mb-4 rounded-xl w-fit rounded-xl");
    } else {
      await createProduct(formData);
    }
  };

  if (isLoading) return <SpinnerNext />;
  if (isSuccess)
    return (
      <div className="bg-success-100 p-4 flex gap-8 rounded-xl w-fit">
        <p className="text-xl font-bold text-success-800">
          Das Produkt wurde erfolgreich erfasst
        </p>
        <CheckIcon className="w-6" />
      </div>
    );
  if (isError) return <p>Error: hat nicht funktioniert {isError}</p>;

  return (
    <>
      <div className={`${focusUpload}`}>
        <DashboardProductImage setImageUrl={handleImageChange} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          variant={"bordered"}
          label="Name"
          name="name"
          isRequired
          onChange={handleInputChange}
        />
        <Textarea
          variant="bordered"
          label="Beschreibung"
          placeholder="Beschreiben Sie das Produkt"
          name="description"
          isRequired
          onChange={handleInputChange}
        />
        <Select
          label="Grösse"
          name="size"
          className="lg:w-1/2"
          isRequired
          onChange={handleSelectChange}
        >
          {sizes.map((size) => (
            <SelectItem key={size.value} value={size.value}>
              {size.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Klub"
          name="club"
          className="lg:w-1/2"
          isRequired
          onChange={handleSelectChange}
        >
          {clubs.map((club) => (
            <SelectItem key={club.value} value={club.value}>
              {club.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          type="number"
          variant={"bordered"}
          label="Preis"
          name="price"
          isRequired
          step="0.05"
          onChange={handleInputChange}
        />
        <div className="my-4">
          <Checkbox name="isVintage" onChange={handleInputChange}>
            Vintage
          </Checkbox>
        </div>
        <div
          className={`text-red-800 bg-red-200 p-2 mb-4 rounded-xl w-full ${imageUploadError}`}
        >
          Wähle ein Produtktbild aus und bestätige es.
        </div>
        <div>
          {!profile?.street ? (
            <Button color="primary" onPress={onOpen}>
              Produkt erstellen
            </Button>
          ) : (
            <Button color="primary" type="submit">
              Produkt erstellen
            </Button>
          )}
        </div>
        <DashboardUserModal
          profileId={profileId}
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
        />
      </form>
    </>
  );
}
