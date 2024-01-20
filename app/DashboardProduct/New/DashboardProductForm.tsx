"use client";
// DashboardProductForm component: Provides a form for creating or editing a product.
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
  // Handle changes in select elements: Updates the formData state with new values.
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes in input elements: Updates the formData state with new values.
  // Handles different input types including text, number, and checkbox.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    // Determine the actual value based on the input type.
    const actualValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : value;
    setFormData({ ...formData, [name]: actualValue });
  };
  // Reset form data and image upload error message when a new product is successfully created.
  useEffect(() => {
    if (isSuccess) {
      // Clear form data fields and set default values.
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
      // Hide the image upload error message.
      setImageUploadError("hidden");
      setFocusUpload("");
    }
  }, [isSuccess, profileId]);
  // Handle form submission: Prevents the default form submission behavior.
  // Checks if profileId and image URL are provided in the formData.
  // If they are available, invokes the createProduct function to submit the product data.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.profileId) {
      console.log("profileId is missing");
    } else if (!formData.image) {
      // Display an error message if the image URL is missing.
      setImageUploadError("block");
      setFocusUpload("bg-red-200 p-2 mb-4 rounded-xl w-fit rounded-xl");
    } else {
      // Submit the product data to create a new product.
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
