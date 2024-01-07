"use client";
import React, { useRef, useState } from "react";
import useProducts from "@/hooks/useProducts";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { Product } from "../types/Product";
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
  useDisclosure,
} from "@nextui-org/react";

export function DashBoardProducts({
  userProfileId,
}: {
  userProfileId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { products, isLoading, isError } = useProducts();
  const { deleteProduct } = useDeleteProduct();
  const { updateProduct } = useUpdateProduct();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const userProducts = (products as Product[])?.filter(
    (product) => product.profileId === userProfileId && !product.buyerId,
  );

  const getActiveProduct = (product: Product) => {
    setActiveProduct(product);
  };

  const handleUpdateDialog = async () => {
    if (activeProduct) {
      await updateProduct(activeProduct);
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
                Produkt anpassen
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col mt-5">
                  <label className="font-bold">Name</label>
                  <input
                    type="text"
                    value={activeProduct ? activeProduct.name : ""}
                    onChange={(event) =>
                      setActiveProduct({
                        ...activeProduct!,
                        name: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <label className="font-bold">Description</label>
                  <input
                    type="text"
                    value={activeProduct ? activeProduct.description || "" : ""}
                    onChange={(event) =>
                      setActiveProduct({
                        ...activeProduct!,
                        description: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <label className="font-bold">Price</label>
                  <input
                    type="number"
                    value={activeProduct ? activeProduct.price : 0}
                    onChange={(event) =>
                      setActiveProduct({
                        ...activeProduct!,
                        price: Number(event.target.value),
                      })
                    }
                  />
                </div>
                {/* inStock */}
                <div className="flex flex-col mt-5">
                  <label className="font-bold">In Stock</label>
                  <input
                    type="checkbox"
                    checked={activeProduct ? activeProduct.inStock : false}
                    onChange={(event) =>
                      setActiveProduct({
                        ...activeProduct!,
                        inStock: event.target.checked,
                      })
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleUpdateDialog}
                >
                  Anpassen
                </Button>
              </ModalFooter>
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
