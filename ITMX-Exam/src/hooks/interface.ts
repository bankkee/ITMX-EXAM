export type ITypeTheme = "light" | "dark";

export interface IThemeContext {
  theme: ITypeTheme;
  toggleTheme: () => void;
}

export interface IThemeProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  title: string;
  detail: string;
  price: string;
  image: {
    name: string;
    previewUrl: string;
  };
}

export interface IProductContext {
  products: IProduct[];
  updateProductDetail: (productId: number, updateProduct: IProduct) => void;
  deleteProduct: (productId: number) => void;
  getIDProduct: (productId: number) => IProduct;
  createProduct: (newProduct: IProduct) => void;
  AddtoCartProduct: (productId: number) => void;
  getPurchasedProducts: () => IProduct[];
  deletePurchasedProduct: (productId: number) => void;
  totalPurchasedProducts: number;
  clearPurchasedProducts: () => void;
}
