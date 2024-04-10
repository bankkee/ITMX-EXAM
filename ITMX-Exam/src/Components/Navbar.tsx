import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "../UI/ToggleTheme";
import { useTheme } from "../hooks/ContextTheme";
import { useProducts } from "../hooks/ContextProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";

interface IpropsNavbar {}
const Navbar: FC<IpropsNavbar> = (props) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { getPurchasedProducts } = useProducts();
  const purchasedProducts = getPurchasedProducts();
  return (
    <div className={`navbar p-6 ${theme === "light" && "bg-blue-600"}`}>
      <div className={`navbar-start `}>
        <a
          className="btn btn-ghost text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </a>
      </div>
      <div className="navbar-center">
        <a
          className="btn btn-ghost text-xl"
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop
        </a>
      </div>
      <div className="navbar-end gap-[10px]">
        <ToggleTheme />
        <div
          className="relative inline-block cursor-pointer"
          onClick={() => navigate("/purchased-products")}
        >
          <FontAwesomeIcon icon={faShoppingCart} size={"xl"} />
          {purchasedProducts.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {purchasedProducts.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
