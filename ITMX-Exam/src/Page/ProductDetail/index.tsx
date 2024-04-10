import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/ContextProduct";
import { useTheme } from "../../hooks/ContextTheme";

interface Iprops {}

const ProductDetail: FC<Iprops> = (props) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { getIDProduct, AddtoCartProduct } = useProducts();
  const product = getIDProduct(Number(productId));
  const { theme } = useTheme();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center gap-6">
      <div className="flex justify-end items-end w-full gap-6">
        <button
          className="btn-animate py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-grey-500 hover:scale-110 transition duration-300 ease-in-out bg-grey-400"
          onClick={() => navigate("/shop")}
        >
          Back
        </button>
        <button
          className="btn-animate py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-orange-500 hover:scale-110 transition duration-300 ease-in-out bg-orange-400"
          onClick={() => {
            AddtoCartProduct(Number(productId));
            alert("Add to Card Success");
          }}
        >
          Add to Card
        </button>
      </div>
      <img
        src={product?.image.previewUrl}
        alt={product?.title}
        className="rounded-lg w-full max-w-xs mb-4"
      />

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{product?.title}</h2>
        <div className="text-lg">
          <span className="text-xl font-semibold"> Price: </span>
          {product?.price}
        </div>
        <div className="h-full">
          <span
            className={`text-lg md:text-xl font-medium ${
              theme === "light" ? "text-blue-400" : ""
            }`}
          >
            Detail:
          </span>
          &nbsp;{product.detail}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
