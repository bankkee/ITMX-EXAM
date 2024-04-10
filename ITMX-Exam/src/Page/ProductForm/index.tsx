import React, { useState, FC, useRef, useEffect } from "react";
import { useProducts } from "../../hooks/ContextProduct";
import { useNavigate, useParams } from "react-router-dom";

interface IProductFormProps {}

const ProductForm: FC<IProductFormProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<{
    name: string;
    previewUrl: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createProduct, getIDProduct, updateProductDetail } = useProducts();
  const navigate = useNavigate();
  const { mode } = useParams();
  const { productId } = useParams();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload image for product.");
      return;
    } else {
      if (mode === "edit") {
        updateProductDetail(Number(productId), {
          id: Number(productId),
          title,
          detail,
          price: price.toString(),
          image: {
            name: image.name,
            previewUrl: image.previewUrl,
          },
        });
        alert("Product updated successfully");
        navigate(`/shop`);
      } else {
        createProduct({
          id: Date.now(),
          title,
          detail,
          price: price.toString(),
          image: {
            name: image.name,
            previewUrl: image.previewUrl,
          },
        });
        alert("Product created successfully");
        navigate("/shop");
      }
      setTitle("");
      setDetail("");
      setPrice("");
      setImage(null);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrice(isNaN(value) ? "" : value);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.startsWith("image")) {
      const previewUrl = URL.createObjectURL(file);
      setImage({ name: file.name, previewUrl });
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDeletePreview = () => {
    if (image) URL.revokeObjectURL(image.previewUrl);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (productId !== "new" && mode !== "create") {
      const product = getIDProduct(Number(productId));
      setTitle(product.title);
      setDetail(product.detail);
      setPrice(parseFloat(product.price));
      setImage({
        name: product.image.name,
        previewUrl: product.image.previewUrl,
      });
    }
  }, []);

  return (
    <>
      <div className="p-10">
        <div className="flex items-center justify-end ">
          {" "}
          <button
            className={`btn-animate py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-grey-500 hover:scale-110 transition duration-300 ease-in-out bg-grey-400`}
            onClick={() => {
              navigate("/shop");
            }}
          >
            Back
          </button>
        </div>
        <div className="flex items-center justify-center ">
          {" "}
          <span className={`text-xl md:text-4xl font-bold  `}>
            Create Product
          </span>
        </div>
        <div className="card w-full md:w-96 bg-base-100 shadow-xl mx-auto p-5">
          <form className="form-control" onSubmit={handleSubmit}>
            <div className="w-full py-[1rem] ">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <button
                type="button"
                className="btn btn-secondary btn-outline w-full"
                onClick={handleImageUploadClick}
              >
                Upload Product Image
              </button>
            </div>
            {image && (
              <div className="mt-2 text-center">
                <div className="text-sm text-gray-600"> {image.name}</div>
                <img
                  src={image.previewUrl}
                  alt="Preview"
                  className="mt-2 w-full max-w-xs h-auto rounded"
                />
                <button
                  type="button"
                  className="btn btn-error btn-sm mt-2"
                  onClick={handleDeletePreview}
                >
                  Delete Preview
                </button>
              </div>
            )}
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered"
              required
            />

            <label className="label">
              <span className="label-text">Detail</span>
            </label>
            <textarea
              placeholder="Detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="textarea textarea-bordered h-24"
              required
            />

            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              value={price?.toString() ?? ""}
              onChange={handlePriceChange}
              className="input input-bordered"
              required
              step="1.00"
            />

            <button
              type="submit"
              className="mt-4 btn-animate  py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 hover:scale-110 transition duration-300 ease-in-out bg-orange-400"
            >
              {mode === "edit" ? "Edit" : "Create"} Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
