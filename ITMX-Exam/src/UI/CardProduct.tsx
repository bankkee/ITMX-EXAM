import { FC } from "react";
import { IProduct } from "../hooks/interface";
import { useTheme } from "../hooks/ContextTheme";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/ContextProduct";

interface Iprops {
  product: IProduct;
  index: number;
}

const CardProduct: FC<Iprops> = (props) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { deleteProduct, AddtoCartProduct } = useProducts();
  const handleDelete = (id: number) => {
    deleteProduct(id);
    navigate("/shop");
  };

  return (
    <div
      className="card md:card-side bg-base-100 shadow-xl flex flex-col md:flex-row "
      key={props.index}
    >
      <figure className="w-full md:w-1/3 lg:w-1/3">
        <img
          src={props.product.image.previewUrl}
          alt="Movie"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body flex-1">
        <span
          className={`h-[100px] w-[220px] sm:w-[350px] lg:w-[220px]  xl:w-[350px] 2xl:w-[450px]  truncate font-bold text-2xl md:text-3xl ${
            theme === "light" && "text-blue-950"
          }`}
        >
          {props.product.title}
        </span>

        <div className="h-full">
          <div className="line-clamp-5">
            <span
              className={`text-lg md:text-xl font-medium ${
                theme === "light" && "text-blue-400"
              }`}
            >
              Detail:
              <span
                className={`break-all text-lg font-normal ${
                  theme === "light" && "text-black"
                }`}
              >
                {props.product.detail}
              </span>
            </span>
          </div>
        </div>

        <div className="card-actions justify-end">
          <button
            className="btn-animate  py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 hover:scale-110 transition duration-300 ease-in-out bg-red-400"
            onClick={() => {
              handleDelete(props.product.id);
            }}
          >
            Delete
          </button>
          <button
            className="btn-animate py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-110 transition duration-300 ease-in-out bg-blue-400"
            onClick={() => {
              navigate(`/product/form/edit/${props.product.id}`);
            }}
          >
            Edit
          </button>
          <button
            className="btn-animate py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 hover:scale-110 transition duration-300 ease-in-out bg-green-400"
            onClick={() => {
              navigate(`/product/${props.product.id}`);
            }}
          >
            View
          </button>
          <button
            className="btn-animate py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-orange-500 hover:scale-110 transition duration-300 ease-in-out bg-orange-400"
            onClick={() => {
              AddtoCartProduct(Number(props.product.id));
              alert("Add to Card Success");
            }}
          >
            Add to Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
