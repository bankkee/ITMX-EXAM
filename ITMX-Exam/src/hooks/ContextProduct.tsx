// ProductContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { IProduct, IProductContext } from "./interface";

const mockData: IProduct[] = [
  {
    id: 1,
    title: "Product 1",
    detail: "This is the detail of Product 1",
    price: "19.99",
    image: {
      name: "Product 1",
      previewUrl: "https://via.placeholder.com/150",
    },
  },
  {
    id: 2,
    title: "Product 2",
    detail: "This is the detail of Product 2",
    price: "29.99",
    image: {
      name: "Product 2",
      previewUrl: "https://via.placeholder.com/150",
    },
  },
];

const ProductContext = createContext<IProductContext | undefined>(undefined);

export const useProducts = (): IProductContext => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>(mockData);
  const [purchasedProductIds, setPurchasedProductIds] = useState<number[]>([]);

  console.log("products", products);

  const createProduct = (newProduct: IProduct): void => {
    setProducts([...products, newProduct]);
  };

  const updateProductDetail = (
    productId: number,
    newDetail: IProduct
  ): void => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...newDetail } : product
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = (productId: number): void => {
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(filteredProducts);
  };

  const getIDProduct = (productId: number): IProduct => {
    return products.find((product) => product.id === productId)!;
  };

  const AddtoCartProduct = (productId: number): void => {
    setPurchasedProductIds((currentIds) => [...currentIds, productId]);
  };

  const getPurchasedProducts = (): IProduct[] => {
    return products.filter((product) =>
      purchasedProductIds.includes(product.id)
    );
  };

  const deletePurchasedProduct = (productId: number): void => {
    setPurchasedProductIds((currentIds) =>
      currentIds.filter((id) => id !== productId)
    );
  };

  const totalPurchasedProducts = getPurchasedProducts().reduce(
    (acc, product) => acc + parseFloat(product.price),
    0
  );

  const clearPurchasedProducts = (): void => {
    setPurchasedProductIds([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        updateProductDetail,
        deleteProduct,
        getIDProduct,
        createProduct,
        AddtoCartProduct,
        getPurchasedProducts,
        deletePurchasedProduct,
        totalPurchasedProducts,
        clearPurchasedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
