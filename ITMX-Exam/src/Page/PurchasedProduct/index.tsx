import { FC } from "react";
import { useProducts } from "../../hooks/ContextProduct";

const PurchasedProductsPage: FC = () => {
  const {
    getPurchasedProducts,
    deletePurchasedProduct,
    totalPurchasedProducts,
    clearPurchasedProducts,
  } = useProducts();
  const purchasedProducts = getPurchasedProducts();
  console.log("purchasedProducts", purchasedProducts);

  return (
    <div className="container mx-auto p-10">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {purchasedProducts.map((product, index) => {
              return (
                <tr key={index}>
                  <td>
                    {" "}
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product.image.previewUrl}
                          alt={product.title}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{product.title}</td>
                  <td>{product.detail}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      className="btn-animate  py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 hover:scale-110 transition duration-300 ease-in-out bg-red-400"
                      onClick={() => {
                        deletePurchasedProduct(product.id);
                        alert("Delete Success");
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total</td>
              <td>{totalPurchasedProducts}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="text-center">
        <button
          className="btn-animate py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-orange-500 hover:scale-110 transition duration-300 ease-in-out bg-orange-400"
          onClick={() => {
            if (purchasedProducts.length === 0) {
              alert("No product to payment");
              return;
            } else {
              alert("Payment Success");
              clearPurchasedProducts();
            }
          }}
        >
          Payment
        </button>
      </div>
    </div>
  );
};

export default PurchasedProductsPage;
