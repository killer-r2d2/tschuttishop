"use client";
import React, { useState } from "react";
import useProducts from "@/hooks/useProducts";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { Product } from "@/app/types/Product";
import { ProductCard } from "@/app/components/Product/ProductCard";
import { Container } from "@/app/components/Base/Container";
import { SpinnerNext } from "@/app/components/Base/Spinner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Checkbox,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import {
  productAspectsClubs,
  productAspectsSizes,
} from "@/app/DashboardProduct/formProductAspects";
import DashboardProductImage from "@/app/DashboardProduct/New/DashboardProductImage";

export function Products({ userProfileId }: { userProfileId: string }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { products, isLoading, isError } = useProducts();
  const { deleteProduct } = useDeleteProduct();
  const { updateProduct } = useUpdateProduct();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const clubs = productAspectsClubs;
  const sizes = productAspectsSizes;

  const userProducts = (products as Product[])?.filter(
    (product) => product.profileId === userProfileId && !product.buyerId,
  );

  const getActiveProduct = (product: Product) => {
    setActiveProduct(product);
  };

  const handleUpdateDialog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(activeProduct as Product);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event: React.MouseEvent, product: Product) => {
    event.preventDefault();
    await deleteProduct(product);
  };
  if (isLoading)
    return (
      <Container>
        <SpinnerNext />
      </Container>
    );
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {activeProduct?.name} anpassen
              </ModalHeader>
              <ModalBody>
                <div>
                  <DashboardProductImage
                    setImageUrl={(url) =>
                      setActiveProduct({
                        ...activeProduct!,
                        image: url,
                      })
                    }
                  />
                </div>
                <form onSubmit={handleUpdateDialog}>
                  <div className="mb-2">
                    <Input
                      type="text"
                      value={activeProduct ? activeProduct.name : ""}
                      variant="bordered"
                      label="Name"
                      name="name"
                      isRequired
                      onChange={(event) =>
                        setActiveProduct({
                          ...activeProduct!,
                          name: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="my-2">
                    <Textarea
                      value={
                        activeProduct ? activeProduct.description || "" : ""
                      }
                      variant="bordered"
                      label="Beschreibung"
                      placeholder="Beschreiben Sie das Produkt"
                      name="description"
                      isRequired
                      onChange={(event) =>
                        setActiveProduct({
                          ...activeProduct!,
                          description: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="my-2">
                    <Select
                      label="Grösse"
                      name="size"
                      isRequired
                      className="lg:w-1/2"
                      selectedKeys={
                        activeProduct?.size ? [activeProduct.size] : []
                      }
                      onChange={(event) =>
                        setActiveProduct({
                          ...activeProduct!,
                          size: event.target.value,
                        })
                      }
                    >
                      {sizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="my-2">
                    <Select
                      label="Klub"
                      name="club"
                      isRequired
                      className="lg:w-1/2"
                      selectedKeys={
                        activeProduct?.club ? [activeProduct.club] : []
                      }
                      onChange={(event) =>
                        setActiveProduct({
                          ...activeProduct!,
                          club: event.target.value,
                        })
                      }
                    >
                      {clubs.map((club) => (
                        <SelectItem key={club.value} value={club.value}>
                          {club.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="my-2">
                    <Input
                      type="number"
                      variant={"bordered"}
                      label="Preis"
                      name="price"
                      isRequired
                      value={activeProduct?.price.toString()}
                      step="0.05"
                      onChange={(event) =>
                        setActiveProduct({
                          ...activeProduct!,
                          price: Number(event.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="my-2">
                    <Checkbox
                      name="isVintage"
                      isSelected={
                        activeProduct ? activeProduct.isVintage : false
                      }
                      onChange={(event) =>
                        setActiveProduct({
                          ...activeProduct!,
                          isVintage: event.target.checked,
                        })
                      }
                    >
                      Vintage
                    </Checkbox>
                  </div>
                  <div className="flex flex-row gap-2 px-0 py-4 justify-end">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Abbrechen
                    </Button>
                    <Button color="primary" type="submit">
                      Produkt Anpassen
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {userProducts && userProducts.length > 0 ? (
          userProducts.map((product) => (
            <ProductCard
              {...product}
              key={product.id}
              hasEdit
              getActiveProduct={getActiveProduct}
              handleDelete={handleDelete}
              openModal={onOpen}
            />
          ))
        ) : (
          <div>
            <p>Noch keine Produkte erfasst.</p>
          </div>
        )}
      </div>
    </div>
  );
}
