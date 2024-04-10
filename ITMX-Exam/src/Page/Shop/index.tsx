import { FC, useState } from "react";
import { useTheme } from "../../hooks/ContextTheme";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/ContextProduct";
import CardProduct from "../../UI/CardProduct";

interface Iprops {}

const Shop: FC<Iprops> = (props) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { products } = useProducts();
  return (
    <div className={`min-h-screen`}>
      <div
        className={`${
          theme === "light" ? "bg-[#343A40]" : "bg-[#121212]"
        } flex items-center justify-center w-full h-[150px]  shadow overflow-hidden`}
      >
        <div className="p-4 ">
          <h1
            className={`text-xl md:text-3xl font-bold ${
              theme === "light" && "text-white"
            }`}
          >
            Blue ShopLazaPee Online
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center p-10">
        {" "}
        <h1
          className={`text-4xl md:text-6xl font-bold  ${
            theme === "light" && "text-blue-500"
          }`}
        >
          Products
        </h1>
      </div>
      <div className="flex flex-col gap-4 px-4 md:px-10 lg:px-15 xl:px-20">
        <div className="flex items-center justify-end">
          <button
            className={`btn-animate py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-110 transition duration-300 ease-in-out bg-blue-400`}
            onClick={() => {
              navigate("/product/form/create/new");
            }}
          >
            Add Product
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          {products.map((item, index) => {
            return <CardProduct product={item} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
